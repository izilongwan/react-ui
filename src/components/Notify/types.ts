export type NotifyInstancePropTypes =
  | 'info'
  | 'success'
  | 'danger'
  | 'warning'
  | 'primary'

export type NotifyFunction = {
  [K in NotifyInstancePropTypes]: (config: Omit<NotifyInstanceProps, 'type'>) => NotifyRet
} & {
  show(config: NotifyInstanceProps): NotifyRet
}

export interface NotifyRet {
  close: Function
  ref: HTMLElement
}

export interface NotifyInstance {
  add (notice: NotifyInstanceProps): NotifyRet;
}

export interface CreateNotification {
  (position: NotifyInstancePropPosition): NotifyInstance;
  instance?: NotifyInstance;
}

export interface NotifyInstancePropPosition {
  [key: string]: any
}

export interface NotifyInstanceProps {
  type: NotifyInstancePropTypes;
  message: string;
  title?: string;
  duration?: number;
  key?: string;
  isShow?: boolean;
  onClose?: Function;
  position?: NotifyInstancePropPosition;
}

export interface State {
  notices: NotifyInstanceProps[];
}

export interface Props {
  position: NotifyInstancePropPosition | undefined
}

export interface PositionStateInstance {
  [key: string]: NotifyInstance;
}
