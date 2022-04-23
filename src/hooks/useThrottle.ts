import React, { useCallback, useRef } from 'react';

interface FnType {
  (): any;
  remove?: () => void;
}

type TRet = [
  (...args: any[]) => any,
  Function
]

export function useThrottle (fn: Function, delay = 500): TRet {
  const tsRef    = useRef<number>(Date.now()),
        timerRef = useRef<NodeJS.Timeout>()

  const _ = <FnType>useCallback(function (this: object, ...args: object[]) {
    const curTs = Date.now()

    timerRef.current && clearTimeout(timerRef.current)

    if (curTs - tsRef.current > delay) {
      tsRef.current = curTs
      return fn.apply(this, args)
    }

    const e = args[0] as React.SyntheticEvent

    // 针对event事件
    e?.persist?.();

    timerRef.current = setTimeout(() => {
      fn.apply(this, args)
    }, delay);

    return this
  }, [])

  _.remove = () => {
    clearTimeout((<{ value?: number }> timerRef.current)?.value)
  }

  return [_, _.remove]
}
