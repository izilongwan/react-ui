import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './toast'

import {
  ToastInstancePropTypes,
  ToastFunction,
  ToastInstance,
  ToastInstanceProps,
  ToastInstancePropPosition,
  CreateNotification,
  PositionStateInstance,
} from './types'

const typesArr = ['info', 'warning', 'success', 'loading']

const positionStateInstance: PositionStateInstance = {}

const getNotification: CreateNotification = (position: ToastInstancePropPosition): ToastInstance => {
  let positionKey = ''

  try {
    positionKey = JSON.stringify(position)
  } catch (error) {

  } finally {
    !positionKey && (positionKey = 'center')
  }

  if (positionStateInstance[positionKey]) {
    return positionStateInstance[positionKey]
  }

  const div = document.createElement('div')

  document.body.appendChild(div)

  const notification = ReactDOM.render(<Toast position={ position } />, div) as unknown as ToastInstance

  positionStateInstance[positionKey] = notification

  return {
    addNotice (notice: ToastInstanceProps): Function {
      return notification!.addNotice(notice)
    },

    destroy () {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

const notice = ({ type, message, duration = 2000, mask = false, position, onClose }: ToastInstanceProps) => {
  const notification: ToastInstance = getNotification(position!)

  return notification.addNotice({ type, message, duration, onClose, mask })
}

const isObject = (value: any) => value && Object.prototype.toString.call(value) === '[object Object]'

export const toastInstanceFunction: ToastFunction = {
  success () { },
  error () { },
  info () { },
  loading () { },
}

typesArr.forEach(type => {
  toastInstanceFunction[type as ToastInstancePropTypes] = (message: string | ToastInstanceProps, duration: number, mask: boolean, position: ToastInstancePropPosition, onClose: Function) => {
    if (isObject(message)) {
      const data = { ...message as ToastInstanceProps, type }

      return notice(data as ToastInstanceProps)
    }
    return notice({ type, message, duration, mask, position, onClose } as ToastInstanceProps)
  }
})

export const success = toastInstanceFunction.success

export const error = toastInstanceFunction.error

export const loading = toastInstanceFunction.loading

export const info = toastInstanceFunction.info

export default toastInstanceFunction
