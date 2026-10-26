import type { IconElement } from '../../../generated/icons';

export function IconShape({ element }: { element: IconElement }) {
  if ('path' in element) return <path d={element.path} fill={element.fill} />;
  if ('circle' in element)
    return (
      <circle
        cx={element.circle[0]}
        cy={element.circle[1]}
        r={element.circle[2]}
        fill={element.fill}
      />
    );
  return (
    <ellipse
      cx={element.ellipse[0]}
      cy={element.ellipse[1]}
      rx={element.ellipse[2]}
      ry={element.ellipse[3]}
      fill={element.fill}
    />
  );
}
