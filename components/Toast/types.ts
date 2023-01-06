import { AlertProps } from "../Alert";

export type Id = string | number | Uint32Array;

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export type ToastPosition =
  | 'topLeft'
  | 'topRight'
  | 'topCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'bottomCenter';

export interface ToastProps extends AlertProps{
  id?: Id;
  position?: ToastPosition;
  autoClose?: number;
  visible?: boolean;
  createdAt?: number;
}

export interface ToastContainerProps {
  positionVariant: ToastPosition;
}
