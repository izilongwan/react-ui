import React from 'react'
import ReactDOM from 'react-dom'
import LoadingComponent from './loading'

import {
  ILoadingInstance,
  ILoadingCreateInstance,
} from './types'

const getInstance: ILoadingCreateInstance = (options) => {
  const div = document.createElement('div');

  let body = document.body

  if (options.body) {
    body = typeof(options.body) === 'string'
      ? document.querySelector(options.body)!
      : options.body as HTMLElement
  }

  body.appendChild(div)

  const instance = ReactDOM.render(<LoadingComponent />, div) as unknown as ILoadingInstance

  return instance
}

export const Loading: ILoadingInstance = {
  show(options) {
    const loading = getInstance(options!)

    return loading.show(options)
  },
}

export default Loading
