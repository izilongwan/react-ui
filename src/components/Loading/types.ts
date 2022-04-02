export interface ILoadingInstance {
  show(config?: ILoadingInstanceProps): {
    ref: any
    close: Function
  }
}

export interface ILoadingCreateInstance {
  (): ILoadingInstance;
  instance?: ILoadingInstance;
}

export interface ILoadingInstanceProps {
  message?: string;
  duration?: number;
  isMaskShow?: boolean;
  key?: string;
  isShow?: boolean;
  imgSrc?: string
  onClose?: Function;
  position?: Record<string, any>;
}

export interface ILoadingState {
  config: ILoadingInstanceProps | null;
}

export interface ILoadingProps {

}

export interface ILoadingPositionStateInstance {
  [key: string]: ILoadingInstance;
}
