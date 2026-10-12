import { useLayoutEffect, useState } from 'react';
import type { MotionStep } from '../../../generated/maps';
import { cssTime, MOTION_DURATION_VARIABLES } from '../../../utils';
import type { TooltipDelays } from '../Tooltip.types';

export function useTooltipDelays(
  trigger: Element | null,
  enterDelay: MotionStep,
  leaveDelay: MotionStep,
): TooltipDelays {
  const [delays, setDelays] = useState<TooltipDelays>({ open: 0, close: 0 });
  useLayoutEffect(() => {
    if (!trigger) return;
    setDelays({
      open: cssTime(trigger, MOTION_DURATION_VARIABLES[enterDelay]),
      close: cssTime(trigger, MOTION_DURATION_VARIABLES[leaveDelay]),
    });
  }, [trigger, enterDelay, leaveDelay]);
  return delays;
}
