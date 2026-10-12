const commandPattern = /[MmLlHhVvCcSsQqTtAaZz]/;
const numberPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/;
const parameterCounts = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

export class PathSyntaxError extends Error {}

export function tokenizePath(d) {
  const commands = [];
  let index = 0;
  let current = null;
  const skip = () => {
    while (index < d.length && /[\s,]/.test(d[index])) index++;
  };
  const readNumber = () => {
    skip();
    const match = numberPattern.exec(d.slice(index));
    if (!match) throw new PathSyntaxError(`Expected a number at ${index}`);
    index += match[0].length;
    return Number(match[0]);
  };
  const readFlag = () => {
    skip();
    const flag = d[index];
    if (flag !== '0' && flag !== '1') throw new PathSyntaxError(`Expected an arc flag at ${index}`);
    index++;
    return Number(flag);
  };
  skip();
  while (index < d.length) {
    if (commandPattern.test(d[index])) {
      current = d[index];
      index++;
    } else if (!current || current.toUpperCase() === 'Z') {
      throw new PathSyntaxError(`Unexpected content at ${index}`);
    }
    const upper = current.toUpperCase();
    const count = parameterCounts[upper];
    const values = [];
    for (let position = 0; position < count; position++)
      values.push(upper === 'A' && (position === 3 || position === 4) ? readFlag() : readNumber());
    commands.push({ command: current, values });
    if (current === 'M') current = 'L';
    else if (current === 'm') current = 'l';
    skip();
    if (upper === 'Z' && index < d.length && !commandPattern.test(d[index]))
      throw new PathSyntaxError(`Unexpected content after close at ${index}`);
  }
  if (!commands.length || commands[0].command.toUpperCase() !== 'M')
    throw new PathSyntaxError('A path must start with a move command');
  return commands;
}

export function absoluteSegments(d) {
  const tokens = tokenizePath(d);
  const subpaths = [];
  let subpath = null;
  let point = [0, 0];
  let start = [0, 0];
  let lastCubic = null;
  let lastQuadratic = null;
  for (const { command, values } of tokens) {
    const relative = command === command.toLowerCase();
    const upper = command.toUpperCase();
    const at = (x, y) => (relative ? [point[0] + x, point[1] + y] : [x, y]);
    let nextCubic = null;
    let nextQuadratic = null;
    if (upper === 'M') {
      point = at(values[0], values[1]);
      start = point;
      subpath = { start, segments: [], closed: false };
      subpaths.push(subpath);
    } else if (upper === 'Z') {
      if (point[0] !== start[0] || point[1] !== start[1])
        subpath.segments.push({ type: 'L', from: point, to: start, closing: true });
      subpath.closed = true;
      point = start;
      subpath = { start, segments: [], closed: false };
      subpaths.push(subpath);
    } else {
      let segment;
      if (upper === 'L') segment = { type: 'L', from: point, to: at(values[0], values[1]) };
      else if (upper === 'H')
        segment = {
          type: 'L',
          from: point,
          to: [relative ? point[0] + values[0] : values[0], point[1]],
        };
      else if (upper === 'V')
        segment = {
          type: 'L',
          from: point,
          to: [point[0], relative ? point[1] + values[0] : values[0]],
        };
      else if (upper === 'C')
        segment = {
          type: 'C',
          from: point,
          c1: at(values[0], values[1]),
          c2: at(values[2], values[3]),
          to: at(values[4], values[5]),
        };
      else if (upper === 'S')
        segment = {
          type: 'C',
          from: point,
          c1: lastCubic ? [2 * point[0] - lastCubic[0], 2 * point[1] - lastCubic[1]] : point,
          c2: at(values[0], values[1]),
          to: at(values[2], values[3]),
        };
      else if (upper === 'Q')
        segment = {
          type: 'Q',
          from: point,
          c: at(values[0], values[1]),
          to: at(values[2], values[3]),
        };
      else if (upper === 'T')
        segment = {
          type: 'Q',
          from: point,
          c: lastQuadratic
            ? [2 * point[0] - lastQuadratic[0], 2 * point[1] - lastQuadratic[1]]
            : point,
          to: at(values[0], values[1]),
        };
      else
        segment = {
          type: 'A',
          from: point,
          rx: Math.abs(values[0]),
          ry: Math.abs(values[1]),
          rotation: values[2],
          large: values[3],
          sweep: values[4],
          to: at(values[5], values[6]),
        };
      if (segment.type === 'C') nextCubic = segment.c2;
      if (segment.type === 'Q') nextQuadratic = segment.c;
      subpath.segments.push(segment);
      point = segment.to;
    }
    lastCubic = nextCubic;
    lastQuadratic = nextQuadratic;
  }
  return { commandCount: tokens.length, subpaths: subpaths.filter((item) => item.segments.length) };
}

const angleBetween = (u, v) => {
  const a = Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]);
  return a;
};

export function arcCenter(segment) {
  const [x1, y1] = segment.from;
  const [x2, y2] = segment.to;
  let { rx, ry } = segment;
  if (rx === 0 || ry === 0 || (x1 === x2 && y1 === y2)) return null;
  const phi = (segment.rotation * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x = cos * dx + sin * dy;
  const y = -sin * dx + cos * dy;
  const lambda = (x * x) / (rx * rx) + (y * y) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const numerator = rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x;
  const denominator = rx * rx * y * y + ry * ry * x * x;
  let factor = Math.sqrt(Math.max(0, numerator / denominator));
  if (segment.large === segment.sweep) factor = -factor;
  const cx1 = (factor * rx * y) / ry;
  const cy1 = (-factor * ry * x) / rx;
  const cx = cos * cx1 - sin * cy1 + (x1 + x2) / 2;
  const cy = sin * cx1 + cos * cy1 + (y1 + y2) / 2;
  const theta = angleBetween([1, 0], [(x - cx1) / rx, (y - cy1) / ry]);
  let delta = angleBetween([(x - cx1) / rx, (y - cy1) / ry], [(-x - cx1) / rx, (-y - cy1) / ry]);
  if (!segment.sweep && delta > 0) delta -= 2 * Math.PI;
  if (segment.sweep && delta < 0) delta += 2 * Math.PI;
  return { cx, cy, rx, ry, cos, sin, theta, delta };
}

export function pointAt(segment, t) {
  const { from, to } = segment;
  if (segment.type === 'L')
    return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
  if (segment.type === 'Q') {
    const u = 1 - t;
    return [0, 1].map((i) => u * u * from[i] + 2 * u * t * segment.c[i] + t * t * to[i]);
  }
  if (segment.type === 'C') {
    const u = 1 - t;
    return [0, 1].map(
      (i) =>
        u * u * u * from[i] +
        3 * u * u * t * segment.c1[i] +
        3 * u * t * t * segment.c2[i] +
        t * t * t * to[i],
    );
  }
  const center = arcCenter(segment);
  if (!center) return pointAt({ type: 'L', from, to }, t);
  const angle = center.theta + center.delta * t;
  const x = center.rx * Math.cos(angle);
  const y = center.ry * Math.sin(angle);
  return [center.cx + center.cos * x - center.sin * y, center.cy + center.sin * x + center.cos * y];
}

const difference = (a, b) => [a[0] - b[0], a[1] - b[1]];
const nonZero = (vector) => Math.hypot(vector[0], vector[1]) > 1e-9;
const firstNonZero = (...vectors) => vectors.find(nonZero) ?? [0, 0];

export function tangents(segment) {
  const { from, to } = segment;
  if (segment.type === 'L') {
    const direction = difference(to, from);
    return { start: direction, end: direction };
  }
  if (segment.type === 'Q')
    return {
      start: firstNonZero(difference(segment.c, from), difference(to, from)),
      end: firstNonZero(difference(to, segment.c), difference(to, from)),
    };
  if (segment.type === 'C')
    return {
      start: firstNonZero(
        difference(segment.c1, from),
        difference(segment.c2, from),
        difference(to, from),
      ),
      end: firstNonZero(
        difference(to, segment.c2),
        difference(to, segment.c1),
        difference(to, from),
      ),
    };
  const center = arcCenter(segment);
  if (!center) {
    const direction = difference(to, from);
    return { start: direction, end: direction };
  }
  const derivative = (angle) => {
    const sign = Math.sign(center.delta);
    const x = -center.rx * Math.sin(angle) * sign;
    const y = center.ry * Math.cos(angle) * sign;
    return [center.cos * x - center.sin * y, center.sin * x + center.cos * y];
  };
  return { start: derivative(center.theta), end: derivative(center.theta + center.delta) };
}

export function turnDegrees(u, v) {
  if (!nonZero(u) || !nonZero(v)) return 0;
  return Math.abs((angleBetween(u, v) * 180) / Math.PI);
}

export function samplePoints(segment, steps = 48) {
  if (segment.type === 'L') return [segment.from, segment.to];
  return Array.from({ length: steps + 1 }, (_, index) => pointAt(segment, index / steps));
}

export function segmentLength(segment) {
  const points = samplePoints(segment);
  let total = 0;
  for (let index = 1; index < points.length; index++)
    total += Math.hypot(
      points[index][0] - points[index - 1][0],
      points[index][1] - points[index - 1][1],
    );
  return total;
}

export function totalTurnDegrees(segment) {
  if (segment.type === 'L') return 0;
  if (segment.type === 'A') {
    const center = arcCenter(segment);
    return center ? Math.abs((center.delta * 180) / Math.PI) : 0;
  }
  const points = samplePoints(segment);
  let total = 0;
  let previous = null;
  for (let index = 1; index < points.length; index++) {
    const direction = difference(points[index], points[index - 1]);
    if (!nonZero(direction)) continue;
    if (previous) total += turnDegrees(previous, direction);
    previous = direction;
  }
  return total;
}
