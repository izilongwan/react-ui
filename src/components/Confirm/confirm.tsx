import React, { Component, SyntheticEvent, useRef } from 'react'
import { xuiScoped } from '@/config'
import { ConfirmOption, ConfirmPropOption, ConfirmState, ShowRs } from './types'

import styles from './index.module.scss'

export default class Confirm extends Component<{}, ConfirmState> {

  state = {
    options: this.getDefaultOptions(),
    promise: new Promise((resolve, reject) => {}),
    resolve: () => {},
    reject: () => {},
  }

  ref!: null | HTMLElement

  handleClick = (e: SyntheticEvent) => {
    const { field } = (e.target as HTMLElement).dataset
    const { options, resolve, reject} = this.state

    const cbs: ((v: typeof rs) => void)[] = [
      reject,
      resolve
    ]

    const n = parseInt(field!, 10)

    const rs = {
      ref: this.ref,
      onClose: () => this.hide()
    }

    options.autoClose && this.setState({
      options: {
        ...options,
        isShow: false,
      }
    })

    cbs?.[n]?.(rs)
  }

  hide() {
    const { options } = this.state

    this.setState({ options: {
      ...options,
      isShow: false,
     }})
  }

  getDefaultOptions(): ConfirmPropOption {
    return {
      id: 'confirm_' + Date.now() + String(Math.random()).slice(-4),
      title: '提示',
      type: 'info',
      content: '是否继续执行此操作?',
      leftText: '确 定',
      rightText: '取 消',
      isShow: true,
      isMaskShow: true,
      autoClose: true,
    }
  }

  show(options: ConfirmOption) {
    let resolve = (value: unknown) => {}
    let reject = () => {}
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })

    const rs = {
      ref: this.ref,
      onClose: () => this.hide()
    }

    this.setState({
      options: Object.assign(
        this.state.options,
        options,
      ),
      promise,
      resolve,
      reject
    }, () => {
      rs.ref = this.ref
    })

    const func = promise as ShowRs

    func.ctx = rs

    return promise
  }

  render() {
    const { options } = this.state

    if (!options) {
      return null
    }

    return (
      <div ref={ node => this.ref = node } className={ `${ xuiScoped } ${ styles['confirm-wrap'] } ${ options.isShow ? styles['fade-in'] : '' }` } >
        <div className={ styles['confirm-wrap_bd'] } onClick={ this.handleClick }>
          <div className={ `${ styles['confirm-wrap_bd_title'] } ${ styles['confirm-wrap_bd_cell'] }` }>
            <span className={ `${ styles['confirm-wrap_bd_title_icon'] } xui-color xui-icon icon-${ options.type } ${ styles.icon } ${ options.type }` }></span>
            <h3 className={ styles['confirm-wrap_bd_title_text'] }>
              { options.title }
            </h3>
            <span className={ styles['confirm-wrap_bd_title_close'] } data-field="0">+</span>
          </div>

          <div className={ `${ styles['confirm-wrap_bd_content'] } ${ styles['confirm-wrap_bd_cell'] }` } >{ options.content }</div>

          <div className={ `${ styles['confirm-wrap_bd_btn-wrap'] } ${ styles['confirm-wrap_bd_cell'] }` } >
            <button className={ `${ styles['confirm-wrap_bd_btn-wrap_btn'] } ${ styles.btn } ${ styles['confirm-wrap_bd_btn-wrap_left'] }` }
              data-field="1">{ options.leftText }</button>


            {
              options.rightText
                &&
                <button className={ `${ styles['confirm-wrap_bd_btn-wrap_btn'] } ${ styles.btn } ${ styles['confirm-wrap_bd_btn-wrap_right'] }` } data-field="0"
                >{ options.rightText }</button>
            }
          </div>
        </div>

        { options.isMaskShow
            &&
            <div className={ styles['confirm-wrap_mask'] }></div>
        }
      </div>
    )
  }
}
