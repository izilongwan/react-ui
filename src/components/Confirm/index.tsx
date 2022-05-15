import ReactDOM from 'react-dom';
import ConfirmComponent from './confirm'
import React from 'react'
import { Instance, ConfirmOption } from './types';

function getInstance(options: ConfirmOption) {
  const div = document.createElement('div');

  let body = document.body

  if (options.body) {
    body = typeof(options.body) === 'string'
      ? document.querySelector(options.body)!
      : options.body as HTMLElement
  }

  body.appendChild(div)

  const instance = ReactDOM.render(<ConfirmComponent />, div) as unknown as Instance
  return instance
}

export const Confirm: Instance = {
  show(options) {
    return getInstance(options).show(options)
  }
}

export default Confirm
