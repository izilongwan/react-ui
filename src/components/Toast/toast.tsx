import React, { Component, ReactElement, LegacyRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './toast.module.scss'
import {
  ToastInstancePropTypes,
  ToastInstanceProps,
  Props,
  State,
} from './types'

class ToastBox extends Component<Props, State> {
  transitionTime: number;
  ref: null | LegacyRef<HTMLDivElement>;

  constructor (props: Props) {
    super(props)
    this.transitionTime = 300
    this.state = { notices: [] }
    this.removeNotice = this.removeNotice.bind(this)
    this.ref = null
  }

  getNoticeKey (): string {
    return `notice-${ Date.now() }-${ String(Math.random()).slice(3) }`
  }

  addNotice (notice: ToastInstanceProps) {
    const { notices } = this.state
    notice.key = this.getNoticeKey()
    notice.isShow = true

    notices.push(notice);//展示所有的提示
    // notices[0] = notice;//仅展示最后一个提示

    this.setState({ notices })

    if (notice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key as string)
      }, notice.duration - this.transitionTime)
    }
    return () => { this.removeNotice(notice.key as string) }
  }

  removeNotice (key: string) {
    const { notices } = this.state

    notices.find((notice) => {
      if (notice.key === key) {
        notice.isShow = false
        return true
      }
      return false
    })

    this.setState({ notices })

    setTimeout(() => {
      this.setState({
        notices: notices.filter((notice) => {
          if (notice.key === key || notice.isShow === false) {
            if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
            return false
          }
          return true
        })
      }, () => {
        // this.state.notices.length <= 0
        //   && ReactDOM.unmountComponentAtNode((this.ref as unknown as HTMLDivElement).parentNode as HTMLDivElement)
      })
    }, this.transitionTime);
  }

  render () {
    const { position } = this.props
    const { notices } = this.state
    const icons = {
      info: 'toast_info',
      success: 'toast_success',
      error: 'toast_error',
      loading: 'toast_loading'
    }

    return (
      <div className={ styles["toast_wrap"] } ref={ node => this.ref = node as LegacyRef<HTMLDivElement> }>
        <div className={ `${ styles['toast_list'] } ${ position ? '' : styles['center'] }` } style={ position || {} }>
          {
            notices.map(notice => (
              <div className={ `${ styles["toast_item"] } ${ notice.isShow ? styles['fade_in'] : '' }` } key={ notice.key }>
                <div className={ styles["toast_box"] }>
                  <div className={ styles["toast_text"] }>
                    <span className={ `${ styles.toast_icon } ${ styles[icons[notice.type as ToastInstancePropTypes]] }` }></span>
                    { notice.message }
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className={ styles['toast_mask'] }>
          {
            notices.map(notice => (
              notice.mask && <div key={ notice.key } className={ styles["toast_mask_item"] }></div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default ToastBox
