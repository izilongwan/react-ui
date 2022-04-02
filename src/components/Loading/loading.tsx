import React, { Component, ReactElement, LegacyRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './loading.module.scss'
import {
  ILoadingInstanceProps,
  ILoadingProps,
  ILoadingState,
} from './types'
import imgSrc from '@/assets/images/loading.gif'

class Loading extends Component<ILoadingProps, ILoadingState> {
  transitionTime: number;
  ref: null | LegacyRef<HTMLDivElement>;

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
      message: '',
      position: {},
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
      this.setState({ config: null })
    }, this.transitionTime);
  }

  render() {
    const { config } = this.state

    if (!config) {
      return null
    }

    return (
      <div className={ styles["loading-wrap"] } ref={ node => this.ref = node as LegacyRef<HTMLDivElement> }>
        <div className={ `${ styles['loading-wrap_box'] }` } style={ config.position || {} }>
          {
            <div className={ `${ styles["loading-wrap_box_content"] } ${ config.isShow ? styles["fade-in"] : '' }` }>
              <img className={ `${ styles["loading-wrap_box_content_img"] }` } src={ config.imgSrc } />
              {
                config.message
                  ? <div className={ styles["loading-wrap_box_content_text"] }>
                    { config.message }
                  </div>
                  : null
              }
            </div>
          }
        </div>

        {
          config.isMaskShow
            ?  <div className={ styles['loading-wrap_mask'] }></div>
            : null
        }
      </div>
    )
  }
}

export default Loading
