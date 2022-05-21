import React from 'react'
import styles from './index.module.scss'
import { Props } from './types'

const Icon = (props: Props) => {
  const { type = 'icon-info', size, color } = props
  const style = {}

  size && Object.assign(style, { fontSize: size + 'px' })
  color && Object.assign(style, { color })

  return (
    <span
      style={ style }
      className={ `
        xui-icon
        ${ type }
        ${ styles.icon }
      `}></span>
  )
}

export default Icon
