export type TypeIcon = `icon-${ TypeColor }`

export type TypeColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export interface Props {
  type?: TypeIcon
  size?: number
  color?: string
}
