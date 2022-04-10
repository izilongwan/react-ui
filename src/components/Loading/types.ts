export interface ILoadingInstance {
  show(config?: ILoadingInstanceProps): {
    ref: any
    close: Function
  }
}

export interface ILoadingCreateInstance {
  (options: ILoadingInstanceProps): ILoadingInstance;
  instance?: ILoadingInstance;
}

export interface ILoadingInstanceProps {
  body?: HTMLElement
  tip?: string;
  duration?: number;
  isMaskShow?: boolean;
  key?: string;
  isShow?: boolean;
  imgSrc?: string
  onClose?: Function;
  style?: Record<string, any>;
}

export interface ILoadingState {
  config: ILoadingInstanceProps | null;
}

export interface ILoadingProps {

}

export interface ILoadingPositionStateInstance {
  [key: string]: ILoadingInstance;
}
