export interface ConfirmState {
  options: ConfirmPropOption
  promise: Promise<any>
  resolve(value: unknown): void
  reject(value: unknown): void
}

export type TypeColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'


export interface ConfirmPropOption {
  id: string
  content: string
  title?: string
  leftText?: string
  rightText?: string
  isShow?: boolean
  isMaskShow?: boolean
  type?: TypeColor
  body?: string | HTMLElement
  autoClose?: boolean
}

export type ConfirmOption = Omit<ConfirmPropOption, 'id' | 'isShow'>

export interface Ret {
  onClose(): void
  ref: null | HTMLElement
}

export type ShowRs = Promise<any> & {
  ctx: Ret
}

export interface Instance {
  show(options: ConfirmOption): ShowRs
}
