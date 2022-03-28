export type ToastInstancePropTypes =
  | 'info'
  | 'success'
  | 'error'
  | 'loading'

export type ToastFunction = {
  [K in ToastInstancePropTypes]: Function;
}

export interface ToastInstance {
  addNotice (notice: ToastInstanceProps): Function;
  destroy (): void;
}

export interface CreateNotification {
  (position: ToastInstancePropPosition): ToastInstance;
  instance?: ToastInstance;
}

export interface ToastInstancePropPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface ToastInstanceProps {
  type: ToastInstancePropTypes;
  message: string;
  duration: number;
  mask: boolean;
  key?: string;
  isShow?: boolean;
  onClose: Function | undefined;
  position?: ToastInstancePropPosition;
}

export interface State {
  notices: ToastInstanceProps[];
}

export interface Props {
  position: ToastInstancePropPosition | undefined
}

export interface PositionStateInstance {
  [key: string]: ToastInstance;
}
