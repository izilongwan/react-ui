export type TypeColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'

export type TypeSize =
  | 'mini'
  | 'normal'
  | 'large'

export interface Props {
  type?: TypeColor
  children?: React.ReactNode | string
  size?: TypeSize
}
