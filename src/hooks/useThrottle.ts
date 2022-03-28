import React, { useRef, useCallback } from 'react'

interface FnType {
  (): any;
  remove?: () => void;
}

export function useThrottle (fn: Function, delay = 500) {
  const tsRef    = useRef<number>(Date.now()),
        timerRef = useRef<number>(0)

  const _ = <FnType>useCallback(function (this: object, ...args: object[]) {
    const curTs = Date.now()

    timerRef.current && clearTimeout(timerRef.current)

    if (curTs - tsRef.current > delay) {
      tsRef.current = curTs
      return fn.apply(this, args)
    }

    const e = args[0] as React.SyntheticEvent

    // 针对event事件
    e?.persist && e?.persist();

    timerRef.current = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay);

    return this
  }, [])

  _.remove = () => {
    clearTimeout((<{ value?: number }> timerRef.current)!.value)
  }

  return [_, _.remove]
}
