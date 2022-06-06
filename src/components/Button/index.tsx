import React from 'react'
import { Props } from './types'
import styles from './index.module.scss'

export const Button = (props: Props) => {
  const { type = 'default', children, size = 'normal' } = props

  return (
    <button className={ `
      xui-scoped
      btn
      xui-bd-color
      xui-bg-color
      ${ type }
      ${ styles.btn }
      ${ styles[`btn_size-${ size }`]
      }` }>
      { children }
    </button>
  )
}

export default Button
