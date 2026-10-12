import { collapseContentClassName, collapseRootClassName } from './Collapse.styles';
import type { CollapseProps } from './Collapse.types';
import { useCollapse } from './hooks';

export function Collapse({
  in: open = false,
  orientation = 'vertical',
  collapsedSize = 'none',
  unmountOnExit = false,
  className,
  children,
  ref,
  ...rest
}: CollapseProps) {
  const collapse = useCollapse({ open, collapsedSize, unmountOnExit, ref });
  return (
    <div
      {...rest}
      {...collapse.rootProps}
      ref={collapse.ref}
      className={collapseRootClassName({ orientation }, className)}
    >
      <div
        {...collapse.contentProps}
        className={collapseContentClassName({ orientation, collapsedSize })}
      >
        {collapse.rendered ? children : null}
      </div>
    </div>
  );
}
