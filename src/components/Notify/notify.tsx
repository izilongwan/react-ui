import { xuiScoped } from '@/config';
import React, { Component, LegacyRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './notify.module.scss'
import {
  NotifyInstanceProps,
  Props,
  State,
} from './types'

class NotifyBox extends Component<Props, State> {
  transitionTime: number;
  wrapRef: null | HTMLDivElement;
  ref: null | HTMLDivElement;

  constructor(props: Props) {
    super(props)
    this.transitionTime = 300
    this.state = { notices: [] }
    this.remove = this.remove.bind(this)
    this.wrapRef = null
    this.ref = null
  }

  getKey(): string {
    return `notice-${ Date.now() }-${ String(Math.random()).slice(3) }`
  }

  getDefaultConfig() {
    return {
      key: this.getKey(),
      isShow: true,
      duration: 2000,
      type: 'primary',
      content: '',
      title: 'Notice',
    }
  }

  add(notice: NotifyInstanceProps) {
    const { notices } = this.state

    notice = Object.assign(this.getDefaultConfig(), notice)

    notices.push(notice);

    const rs = {
      ref: this.ref,
      close: () => this.remove(notice.key!)
    }

    this.setState({ notices }, () => {
      if (notice.duration! > 0) {
        setTimeout(() => {
          this.remove(notice.key!)
        }, notice.duration! - this.transitionTime)
      }

      rs.ref = this.ref
    })

    return rs
  }

  remove(key: string) {
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
        //   && ReactDOM.unmountComponentAtNode(this.wrapRef!.parentNode as HTMLElement)
      })
    }, this.transitionTime);
  }

  render() {
    const { style } = this.props
    const { notices } = this.state

    return (
      <div className={ `${ xuiScoped } ${ styles['notify-wrap'] }` } ref={ node => this.wrapRef = node }>
        <div className={ `${ styles['notify-wrap_list'] }` } style={ style }>
          {
            notices.map(notice => (
              <div ref={ node => this.ref = node } className={ `${ styles['notify-wrap_list_item'] } ${ styles[`notify-wrap_list_item-type-${ notice.type }`] } ${ notice.isShow ? styles['fade-in'] : '' } ` } key={ notice.key }>
                <div className={ styles['notify-wrap_list_item_content'] }>
                  <span className={ `${ styles['notify-wrap_list_item_content_icon'] } ${ styles[`icon-${ notice.type }`] } ` }></span>

                  <div className={ styles['notify-wrap_list_item_content_main'] }>
                    <div className={ styles['notify-wrap_list_item_content_title'] }>
                      <h4 className={ `${styles['notify-wrap_list_item_content_title_content']} ${styles.title} bold` }>{ notice.title }</h4>

                      <span className={ `${styles['notify-wrap_list_item_content_title_close']} bold` } onClick={ () => this.remove(notice.key!) }>
                        +
                      </span>
                    </div>

                    <div dangerouslySetInnerHTML={ { __html: notice.content } } className={ styles["notify-wrap_list_item_content_text"] }>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default NotifyBox
