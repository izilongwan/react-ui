import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './loading.module.scss'

import {
  ILoadingInstanceProps,
  ILoadingProps,
  ILoadingState,
} from './types'
import imgSrc from '@/assets/images/loading.gif'
import { xuiScoped } from '@/config'

export class Loading extends Component<ILoadingProps, ILoadingState> {
  transitionTime: number;
  ref: HTMLDivElement | null

  constructor(props: ILoadingProps) {
    super(props)
    this.transitionTime = 300
    this.state = { config: null }
    this.hide = this.hide.bind(this)
    this.ref = null
  }

  getKey(): string {
    return `loading-${ Date.now() }-${ String(Math.random()).slice(3) }`
  }

  getDefaultConfig() {
    return {
      key: this.getKey(),
      isShow: true,
      duration: -1,
      isMaskShow: true,
      tip: '',
      style: {},
      imgSrc
    }
  }

  show(config: ILoadingInstanceProps) {
    config = Object.assign(this.getDefaultConfig(), config)

    const rs = {
      ref: this.ref,
      close: () => this.hide()
    }

    this.setState({ config }, () => {
      if (config.duration! > 0) {
        setTimeout(() => {
          this.hide()
        }, config.duration! - this.transitionTime)
      }

      rs.ref = this.ref
    })

    return rs
  }

  hide() {
    const { config } = this.state

    if (!config) {
      return
    }

    config.isShow = false

    setTimeout(() => {
      this.setState({ config: null }, this.removeContainerNode)
    }, this.transitionTime);
  }

  removeContainerNode() {
    const oContainer = this.ref!.parentElement!

    ReactDOM.unmountComponentAtNode(oContainer)
    oContainer?.remove()
  }

  render() {
    const { config } = this.state

    return (
      <div className={ `${ xuiScoped } ${ styles['loading-wrap'] }` } ref={ node => this.ref = node }>
        {
          config
            ? this.renderContent(config)
            : null
        }
      </div>
    )
  }

  renderContent(config: ILoadingInstanceProps) {

    return (
      <>
        <div className={ `${ styles['loading-wrap_box'] }` } style={ config.style }>
          {
            <div className={ `${ styles['loading-wrap_box_content'] } ${ config.isShow ? styles['fade-in'] : '' }` }>
              <img className={ `${ styles['loading-wrap_box_content_img'] }` } src={ config.imgSrc } />
              {
                config.tip
                  ? <div className={ styles['loading-wrap_box_content_text'] }>
                    { config.tip }
                  </div>
                  : null
              }
            </div>
          }
        </div>

        {
          config.isMaskShow
            ? <div className={ styles['loading-wrap_mask'] }></div>
            : null
        }
      </>
    )
  }
}

export default Loading
