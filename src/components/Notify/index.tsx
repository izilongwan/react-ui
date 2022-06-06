import React from 'react'
import ReactDOM from 'react-dom'
import NotifyComponent from './notify'

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

const getNotification: CreateNotification = (style: NotifyInstancePropPosition) => {
  let positionKey = ''

  try {
    positionKey = JSON.stringify(style)
  } catch (error) {

  } finally {
    !positionKey && (positionKey = 'default')
  }

  if (positionStateInstance[positionKey]) {
    return positionStateInstance[positionKey]
  }

  const div = document.createElement('div')

  document.body.appendChild(div)

  const notification = ReactDOM.render(<NotifyComponent style={ style } />, div) as unknown as NotifyInstance

  positionStateInstance[positionKey] = notification

  return notification
}

const notice = (config: NotifyInstanceProps) => {
  const notification = getNotification(config.style!)

  return notification.add(config)
}

export const Notify = {} as NotifyFunction

typesArr.forEach(type => {
  Notify[type] = (config) => {
    return notice(Object.assign({ type }, config))
  }
})

export default Notify
