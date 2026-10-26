import type {
  ChangeEvent,
  ComponentPropsWithRef,
  DragEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  RefCallback,
} from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { DROPZONE_COMPONENT_NAME_KEY, DROPZONE_ERROR_INTENT } from './Dropzone.constants';

export type DropzoneTokens = ComponentTokens[typeof DROPZONE_COMPONENT_NAME_KEY];
export type DropzoneVariant = VariantOf<DropzoneTokens>;
export type DropzoneSize = SizeOf<DropzoneTokens>;
export type DropzoneIntent = ColorOf<DropzoneTokens>;
export type DropzoneColor = Exclude<DropzoneIntent, typeof DROPZONE_ERROR_INTENT>;

export type FileRejectionReason = 'type' | 'size' | 'count';

export interface FileRejection {
  file: File;
  reasons: FileRejectionReason[];
}

export type DropzoneDragVerdict = 'accept' | 'reject';

type DropzoneOwnProps = {
  accept?: string;
  multiple?: boolean;
  capture?: InputHTMLAttributes<HTMLInputElement>['capture'];
  maxSize?: number;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;
  onDragVerdictChange?: (verdict: DropzoneDragVerdict | undefined) => void;
  inputRef?: Ref<HTMLInputElement>;
  label?: ReactNode;
  helperText?: ReactNode;
  icon?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  size?: Responsive<DropzoneSize>;
  color?: DropzoneColor;
  variant?: DropzoneVariant;
};

export type DropzoneProps = DropzoneOwnProps &
  Omit<
    ComponentPropsWithRef<'div'>,
    keyof DropzoneOwnProps | 'style' | 'children' | 'role' | 'tabIndex'
  >;

type DragHandler = ((event: DragEvent<HTMLDivElement>) => void) | undefined;

export interface DropzoneStyleProps {
  variant: DropzoneVariant;
  size: Responsive<DropzoneSize>;
  intent: DropzoneIntent;
}

export interface DropzoneFileRules {
  accept: string | undefined;
  multiple: boolean;
  maxSize: number | undefined;
  maxFiles: number | undefined;
}

export interface DropzoneFilePartition {
  accepted: File[];
  rejected: FileRejection[];
}

export interface DropzoneInputProps {
  ref: RefCallback<HTMLInputElement>;
  type: 'file';
  accept: string | undefined;
  multiple: boolean;
  capture: InputHTMLAttributes<HTMLInputElement>['capture'];
  disabled: boolean;
  hidden: true;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface UseDropzoneFilesParams {
  accept: string | undefined;
  multiple: boolean;
  capture: InputHTMLAttributes<HTMLInputElement>['capture'];
  maxSize: number | undefined;
  maxFiles: number | undefined;
  disabled: boolean;
  onFilesSelected: ((files: File[]) => void) | undefined;
  onFilesRejected: ((rejections: FileRejection[]) => void) | undefined;
  inputRef: Ref<HTMLInputElement> | undefined;
}

export interface UseDropzoneFilesResult {
  open: () => void;
  select: (files: readonly File[]) => void;
  verdict: (transfer: DataTransfer | null) => DropzoneDragVerdict | undefined;
  inputProps: DropzoneInputProps;
}

export interface UseDropzoneParams {
  id: string | undefined;
  accept: string | undefined;
  multiple: boolean;
  capture: InputHTMLAttributes<HTMLInputElement>['capture'];
  maxSize: number | undefined;
  maxFiles: number | undefined;
  disabled: boolean;
  error: boolean;
  size: Responsive<DropzoneSize>;
  color: DropzoneColor;
  variant: DropzoneVariant;
  label: ReactNode;
  helperText: ReactNode;
  icon: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
  onFilesSelected: ((files: File[]) => void) | undefined;
  onFilesRejected: ((rejections: FileRejection[]) => void) | undefined;
  onDragVerdictChange: ((verdict: DropzoneDragVerdict | undefined) => void) | undefined;
  inputRef: Ref<HTMLInputElement> | undefined;
  onClick: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
  onDragEnter: DragHandler;
  onDragOver: DragHandler;
  onDragLeave: DragHandler;
  onDrop: DragHandler;
}

export interface DropzoneDragHandlers {
  onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
}

export interface UseDropzoneDragParams {
  files: UseDropzoneFilesResult;
  disabled: boolean;
  onDragVerdictChange: ((verdict: DropzoneDragVerdict | undefined) => void) | undefined;
  onDragEnter: DragHandler;
  onDragOver: DragHandler;
  onDragLeave: DragHandler;
  onDrop: DragHandler;
}

export interface UseDropzoneDragResult {
  verdict: DropzoneDragVerdict | undefined;
  handlers: DropzoneDragHandlers;
}

export interface UseDropzoneIdsParams {
  id: string | undefined;
  label: ReactNode;
  helperText: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
}

export interface UseDropzoneIdsResult {
  rootId: string;
  hasLabel: boolean;
  hasHelperText: boolean;
  labelId: string | undefined;
  helperId: string | undefined;
  labelledBy: string | undefined;
  describedBy: string | undefined;
}

export type DropzoneRootProps = DropzoneDragHandlers & {
  id: string;
  'aria-labelledby': string | undefined;
  'aria-describedby': string | undefined;
  'data-drag-accept': '' | undefined;
  'data-drag-reject': '' | undefined;
  'data-error': '' | undefined;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export interface UseDropzoneResult {
  styleProps: DropzoneStyleProps;
  hasLabel: boolean;
  hasHelperText: boolean;
  labelId: string | undefined;
  helperId: string | undefined;
  hasIcon: boolean;
  iconSize: Responsive<IconSize> | undefined;
  rootProps: DropzoneRootProps;
  inputProps: DropzoneInputProps;
}
