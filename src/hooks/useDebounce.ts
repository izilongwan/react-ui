import React, { useRef } from 'react'

export function useDebounce (fn: Function, delay = 500, immediate = false) {
  const timerRef = useRef(0)

  function _ (this: object, ...args: object[]) {
    timerRef.current && clearTimeout(timerRef.current)

    if (immediate && !timerRef.current) {
      timerRef.current = -1
      return fn.apply(this, args)
    }

    const e = args[0] as React.SyntheticEvent

    // 针对event事件
    e?.persist && e?.persist()

    timerRef.current = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }

  _.remove = () => {
    clearTimeout((<{ value?: number }> timerRef.current)!.value)
  }

  return [_, _.remove]
}
