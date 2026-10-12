import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { exists, readJson, root } from '../io.mjs';
import {
  PathSyntaxError,
  absoluteSegments,
  samplePoints,
  segmentLength,
  tangents,
  totalTurnDegrees,
  turnDegrees,
} from './path.mjs';

export const iconContract = {
  viewBox: '0 0 24 24',
  liveArea: [3, 21],
  tolerance: 0.5,
  maxCommands: 80,
  maxPathLength: 1800,
  maxJoinTurnDegrees: 12,
  minCurveRadius: 0.5,
  radiusCheckTurnDegrees: 20,
};

const rootAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: iconContract.viewBox,
  fill: 'none',
  stroke: 'currentColor',
};
const elementAttributes = {
  path: ['d'],
  circle: ['cx', 'cy', 'r'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
};
const namePattern = /^[a-z]+(?:-[a-z]+)*$/;
const numberPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  preserveOrder: true,
  commentPropName: '#comment',
  cdataPropName: '#cdata',
  parseAttributeValue: false,
  parseTagValue: false,
  processEntities: false,
  trimValues: true,
});

export class IconContractError extends Error {
  constructor(findings) {
    super(findings.map(({ code, icon, message }) => `${code}: ${icon}: ${message}`).join('\n'));
    this.name = 'IconContractError';
    this.findings = findings;
  }
}

const round = (value) => Math.round(value * 1000) / 1000;

export function validateIconSource(name, source) {
  const findings = [];
  const add = (code, message) => findings.push({ code, icon: name, message });
  const elements = [];
  if (!namePattern.test(name)) add('icon-name', 'Names are lowercase full words joined by hyphens');
  if (/<!|<\?/.test(source))
    add('icon-forbidden-element', 'Declarations, comments and CDATA are not allowed');
  const wellFormed = XMLValidator.validate(source);
  if (wellFormed !== true) {
    add('icon-invalid-xml', wellFormed.err?.msg ?? 'Malformed XML');
    return { findings, elements };
  }
  const document = parser.parse(source);
  const nodes = document.filter((node) => !Object.hasOwn(node, '#text') || node['#text'] !== '');
  if (nodes.length !== 1 || !Object.hasOwn(nodes[0], 'svg')) {
    add('icon-forbidden-element', 'The document must contain exactly one svg root');
    return { findings, elements };
  }
  const attributes = nodes[0][':@'] ?? {};
  for (const [key, expected] of Object.entries(rootAttributes))
    if (attributes[key] !== expected)
      add(
        key === 'viewBox' ? 'icon-viewbox' : 'icon-root-paint',
        `Root ${key} must be "${expected}"`,
      );
  for (const key of Object.keys(attributes))
    if (!Object.hasOwn(rootAttributes, key))
      add('icon-forbidden-attribute', `Root attribute ${key} is not allowed`);
  const points = [];
  for (const child of nodes[0].svg) {
    const tag = Object.keys(child).find((key) => key !== ':@');
    if (!tag || !Object.hasOwn(elementAttributes, tag)) {
      add('icon-forbidden-element', `Element ${tag ?? 'text'} is not allowed`);
      continue;
    }
    if (child[tag].length) add('icon-forbidden-element', `${tag} must be empty`);
    const values = child[':@'] ?? {};
    for (const key of Object.keys(values))
      if (!elementAttributes[tag].includes(key))
        add('icon-forbidden-attribute', `${tag} attribute ${key} is not allowed`);
    const missing = elementAttributes[tag].filter((key) => !Object.hasOwn(values, key));
    if (missing.length) {
      add('icon-forbidden-attribute', `${tag} requires ${missing.join(', ')}`);
      continue;
    }
    if (tag === 'path') {
      const d = values.d;
      if (d.length > iconContract.maxPathLength)
        add('icon-path-complexity', `Path data exceeds ${iconContract.maxPathLength} characters`);
      let parsed;
      try {
        parsed = absoluteSegments(d);
      } catch (error) {
        if (!(error instanceof PathSyntaxError)) throw error;
        add('icon-path-syntax', error.message);
        continue;
      }
      if (parsed.commandCount > iconContract.maxCommands)
        add('icon-path-complexity', `Path uses more than ${iconContract.maxCommands} commands`);
      for (const subpath of parsed.subpaths) {
        const { segments } = subpath;
        for (const segment of segments) {
          points.push(...samplePoints(segment));
          const turn = totalTurnDegrees(segment);
          if (segment.type !== 'L' && turn > iconContract.radiusCheckTurnDegrees) {
            const radius = segmentLength(segment) / ((turn * Math.PI) / 180);
            if (radius < iconContract.minCurveRadius)
              add(
                'icon-corner-radius',
                `A curve ending at ${segment.to.map(round).join(',')} turns ${Math.round(turn)}° with radius ${round(radius)}`,
              );
          }
        }
        const joins = segments.map((segment, index) => [segment, segments[index + 1]]).slice(0, -1);
        if (subpath.closed && segments.length > 1) joins.push([segments.at(-1), segments[0]]);
        for (const [before, after] of joins) {
          const turn = turnDegrees(tangents(before).end, tangents(after).start);
          if (turn > iconContract.maxJoinTurnDegrees)
            add(
              'icon-sharp-corner',
              `Join at ${before.to.map(round).join(',')} turns ${Math.round(turn)}° without a curve`,
            );
        }
      }
      elements.push({ path: d });
    } else {
      const numbers = elementAttributes[tag].map((key) => values[key]);
      if (!numbers.every((value) => numberPattern.test(value))) {
        add('icon-forbidden-attribute', `${tag} coordinates must be plain numbers`);
        continue;
      }
      const [cx, cy, rx, ry = rx] = numbers.map(Number);
      if (rx <= 0 || ry <= 0) add('icon-forbidden-attribute', `${tag} radius must be positive`);
      points.push([cx - rx, cy - ry], [cx + rx, cy + ry]);
      elements.push({ [tag]: numbers.map(Number) });
    }
  }
  if (!elements.length) add('icon-empty', 'An icon needs at least one drawing element');
  const [low, high] = iconContract.liveArea;
  const outside = points.find(
    ([x, y]) =>
      Math.min(x, y) < low - iconContract.tolerance - 1e-9 ||
      Math.max(x, y) > high + iconContract.tolerance + 1e-9,
  );
  if (outside)
    add(
      'icon-outside-live-area',
      `Artwork reaches ${outside.map(round).join(',')}; keep it inside ${low}–${high} ± ${iconContract.tolerance}`,
    );
  return { findings, elements };
}

const artworkKey = (elements) =>
  elements
    .map((element) => JSON.stringify(element))
    .sort()
    .join('|');

export async function readIcons(directory = root) {
  const folder = path.join(directory, 'icons');
  const entries = (await readdir(folder, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  );
  const findings = [];
  const icons = new Map();
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.svg')) {
      findings.push({
        code: 'icon-forbidden-element',
        icon: entry.name,
        message: 'Only .svg files belong in icons/',
      });
      continue;
    }
    const name = entry.name.slice(0, -4);
    const result = validateIconSource(name, await readFile(path.join(folder, entry.name), 'utf8'));
    findings.push(...result.findings);
    icons.set(name, result.elements);
  }
  const seen = new Map();
  for (const [name, elements] of icons) {
    const key = artworkKey(elements);
    if (seen.has(key))
      findings.push({
        code: 'icon-duplicate-artwork',
        icon: name,
        message: `Same artwork as ${seen.get(key)}`,
      });
    else seen.set(key, name);
  }
  const inventoryFile = path.join(directory, 'icons.json');
  if (await exists(inventoryFile)) {
    const listed = new Set((await readJson(inventoryFile)).map((icon) => icon.name));
    for (const name of icons.keys())
      if (!listed.has(name))
        findings.push({
          code: 'icon-inventory-drift',
          icon: name,
          message: 'Icon is missing from the inventory',
        });
    for (const name of listed)
      if (!icons.has(name))
        findings.push({
          code: 'icon-inventory-drift',
          icon: name,
          message: 'Inventory entry has no SVG',
        });
  }
  if (!icons.size) findings.push({ code: 'icon-empty', icon: 'icons', message: 'No icons found' });
  return { icons, findings };
}

export async function assertIcons(directory = root) {
  const { icons, findings } = await readIcons(directory);
  if (findings.length) throw new IconContractError(findings);
  return icons;
}
