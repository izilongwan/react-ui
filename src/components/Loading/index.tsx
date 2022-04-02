import React from 'react'
import ReactDOM from 'react-dom'
import LoadingComponent from './loading'

import {
  ILoadingInstance,
  ILoadingCreateInstance,
} from './types'

const getInstance: ILoadingCreateInstance = (): ILoadingInstance => {
  const div = document.createElement('div')

  document.body.appendChild(div)

  const instance = ReactDOM.render(<LoadingComponent />, div) as unknown as ILoadingInstance

  return instance
}

export const Loading: ILoadingInstance = {
  show(config) {
    const loading = getInstance()

    return loading.show(config)
  },
}

export default Loading
