import React from 'react'
import ReactDOM from 'react-dom'
import LoadingComponent from './loading'

import {
  ILoadingInstance,
  ILoadingCreateInstance,
} from './types'

const getInstance: ILoadingCreateInstance = (options): ILoadingInstance => {
  const div = document.createElement('div');

  (options.body ?? document.body).appendChild(div)

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
