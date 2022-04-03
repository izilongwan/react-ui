import React from 'react'
import ReactDOM from 'react-dom'
import Notify from './notify'

import {
  NotifyInstancePropTypes,
  NotifyFunction,
  NotifyInstance,
  NotifyInstanceProps,
  NotifyInstancePropPosition,
  CreateNotification,
  PositionStateInstance,
} from './types'

const typesArr: NotifyInstancePropTypes[] = ['info', 'warning', 'success', 'danger', 'primary']

const positionStateInstance: PositionStateInstance = {}

const getNotification: CreateNotification = (position: NotifyInstancePropPosition): NotifyInstance => {
  let positionKey = ''

  try {
    positionKey = JSON.stringify(position)
  } catch (error) {

  } finally {
    !positionKey && (positionKey = 'default')
  }

  if (positionStateInstance[positionKey]) {
    return positionStateInstance[positionKey]
  }

  const div = document.createElement('div')

  document.body.appendChild(div)

  const notification = ReactDOM.render(<Notify position={ position } />, div) as unknown as NotifyInstance

  positionStateInstance[positionKey] = notification

  return notification
}

const notice = (config: NotifyInstanceProps) => {
  const notification = getNotification(config.position!)

  return notification.add(config)
}

export const notifyInstanceFunction: NotifyFunction = {
  warning: (): any => { },
  primary: (): any => { },
  success: (): any => { },
  danger: (): any => { },
  info: (): any => { },
  show: (): any => { },
}

typesArr.forEach(type => {
  notifyInstanceFunction[type] = (config) => {
    return notice(Object.assign({ type }, config))
  }
})

export default notifyInstanceFunction
