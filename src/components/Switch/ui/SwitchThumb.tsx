import { switchSpacerClassName, switchThumbClassName } from '../Switch.styles';

export function SwitchThumb() {
  return (
    <>
      <span aria-hidden="true" data-slot="thumb" className={switchThumbClassName} />
      <span aria-hidden="true" className={switchSpacerClassName} />
    </>
  );
}
