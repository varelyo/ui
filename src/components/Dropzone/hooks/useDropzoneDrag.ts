import { useRef, useState, type DragEvent } from 'react';
import type {
  DropzoneDragVerdict,
  UseDropzoneDragParams,
  UseDropzoneDragResult,
} from '../Dropzone.types';

export function useDropzoneDrag({
  files,
  disabled,
  onDragVerdictChange,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}: UseDropzoneDragParams): UseDropzoneDragResult {
  const [verdict, setVerdict] = useState<DropzoneDragVerdict | undefined>(undefined);
  const targets = useRef(new Set<EventTarget>());
  const change = (next: DropzoneDragVerdict | undefined) => {
    if (next === verdict) return;
    setVerdict(next);
    onDragVerdictChange?.(next);
  };
  return {
    verdict: disabled ? undefined : verdict,
    handlers: {
      onDragEnter: (event: DragEvent<HTMLDivElement>) => {
        onDragEnter?.(event);
        const next = files.verdict(event.dataTransfer);
        if (next === undefined) return;
        targets.current.add(event.target);
        event.preventDefault();
        if (!disabled) change(next);
      },
      onDragOver: (event: DragEvent<HTMLDivElement>) => {
        onDragOver?.(event);
        if (files.verdict(event.dataTransfer) === undefined) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
      },
      onDragLeave: (event: DragEvent<HTMLDivElement>) => {
        onDragLeave?.(event);
        targets.current.delete(event.target);
        if (
          event.relatedTarget instanceof Node &&
          event.currentTarget.contains(event.relatedTarget)
        )
          return;
        if (targets.current.size > 0) return;
        change(undefined);
      },
      onDrop: (event: DragEvent<HTMLDivElement>) => {
        onDrop?.(event);
        if (files.verdict(event.dataTransfer) === undefined) return;
        event.preventDefault();
        targets.current.clear();
        change(undefined);
        files.select(Array.from(event.dataTransfer.files));
      },
    },
  };
}
