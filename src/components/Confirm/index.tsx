import ReactDOM from 'react-dom';
import ConfirmComponent from './confirm'
import React from 'react'
import { Instance } from './types';

function getInstance() {
  const div = document.createElement('div');

  document.body.appendChild(div)

  const instance = ReactDOM.render(<ConfirmComponent />, div) as unknown as Instance
  return instance
}

export const Confirm: Instance = {
  show(options) {
    return getInstance().show(options)
  }
}

export default Confirm
