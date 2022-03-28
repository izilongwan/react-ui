import { useState, SyntheticEvent, useEffect, useRef } from 'react';
import { useThrottle } from '../..';
import { binarySearch } from '../../libs/util';
import { VirtualListPositionList, VirtualListProps } from './types';

export function useVirtualList(props: VirtualListProps) {
  const {
    children = [],
    colHeight = 40,
    belowPercentage = 0.2,
    abovePercentage = 0.2,
    showCount = 20,
    isLoaded = false,
    pullupLoadOffset = 40,
    handlePullupLoad = () => { },
    handleClick = () => { },
    handleScroll = () => { },
    delay = 300,
  } = props

  const [listIndex, setListIndex] = useState({
    startIndex: 0,
    start: 0,
    end: showCount,
  })
  const [offsetY, setOffsetY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(children.length * colHeight)
  const [positionList, setPositionList] = useState(() => initOItemPosition(children.length))
  const [loadTip, setLoadTip] = useState('正在玩命加载...')
  const [isLoading, setIsLoading] = useState(false)

  const listRef = useRef<HTMLElement>(),
        wrapRef = useRef<HTMLElement>(),
        loadingRef = useRef(false)

  useEffect(() => {
    setOItemPosition(positionList)
  }, [])

  useEffect(() => {
    addOItems()
  }, [children.length, positionList.length])

  useEffect(() => {
    setLoadTip(isLoaded ? '我是有底线的人' : '正在玩命加载...')
  }, [isLoaded])

  function initOItemPosition (length: number, baseIndex = 0): VirtualListPositionList[] {
    return Array.from({ length }, (_, idx) => {
      return {
        height: colHeight,
        bottom: (baseIndex + idx + 1) * colHeight,
        top: (baseIndex + idx) * colHeight,
        marginTop: 0,
        marginBottom: 0,
      }
    })
  }

  function addOItems () {
    if (children.length === positionList.length) {
      return
    }

    const prevLength = positionList.length,
          length     = children.length - prevLength,
          list       = initOItemPosition(length, prevLength)

    positionList.push(...list)
    setOItemPosition(positionList)
    handleListIndexChange({ startIndex: listIndex.startIndex, scrollTop: 0 })
    loadingRef.current = false
    setIsLoading(false)
  }

  function computeAboveBelowCount (startIndex: number) {
    const { min, floor } = Math

    return {
      aboveCount: min(startIndex, floor(showCount * abovePercentage)),
      belowCount: min(positionList.length - (startIndex + showCount), floor(showCount * belowPercentage)),
    }
  }

  function computeIndex (startIndex: number) {
    const { aboveCount, belowCount } = computeAboveBelowCount(startIndex)

    return {
      start: startIndex - aboveCount,
      end: startIndex + showCount + belowCount,
    }
  }

  function handleListIndexChange ({ startIndex, scrollTop, e }: { startIndex: number, scrollTop: number, e?: SyntheticEvent }) {
    const { start, end } = computeIndex(startIndex)

    setScrollHeight(positionList[positionList.length - 1].bottom)

    if (isScrollAttachedBottom(scrollTop)) {
      if (loadingRef.current) {
        return
      }

      loadingRef.current = true
      setIsLoading(true)
      handlePullupLoadAction(e, startIndex ? startIndex - 1 : 0)
      return
    }

    setPositionList(positionList)
    setListIndex({ start, end, startIndex })
    setOffsetY(start ? positionList[start].top : 0)
    e && handleScroll(e, startIndex ? startIndex - 1 : 0)
  }

  function setOItemPosition (posList: VirtualListPositionList[] = positionList) {
    const oItems = Array.from(listRef.current!.children)

    return oItems.forEach((oItem, i) => {
      const { height } = oItem.getBoundingClientRect(),
            idx = parseInt(oItem.getAttribute('data-virtual-idx') as string)

      const { marginTop, marginBottom } = window.getComputedStyle(oItem),
            mT = parseInt(marginTop),
            mB = parseInt(marginBottom)

      const { height: oldHeight } = posList[idx] || { height: colHeight }

      // 获取高度差
      if (height - oldHeight === 0) {
        return
      }

      const { bottom: prevBottom } = posList[idx - 1] || { bottom: idx * colHeight }

      posList[idx] = {
        top: idx
          ? prevBottom
          : 0,
        bottom: idx
          ? height + prevBottom + mT + mB
          : height + mT + mB,
        height: height + mT + mB,
        marginTop: mT,
        marginBottom: mB,
      }

      posList.forEach((item, index, _) => {
        if (index > idx) {
          item.top = _[index - 1].bottom
          item.bottom = item.height + item.top
        }
      })
    })
  }

  function isScrollAttachedBottom (scrollTop: number): boolean {
    const { clientHeight, scrollHeight } = wrapRef.current as unknown as HTMLElement

    if (clientHeight + scrollTop + pullupLoadOffset >= scrollHeight) {
      return true
    }

    return false
  }

  const [hanleScrollAction] = useThrottle((e: SyntheticEvent) => {
    const { scrollTop } = e.target as HTMLElement

    setOItemPosition(positionList)

    const startIndex = binarySearch(positionList, scrollTop)

    if (startIndex > -1) {
      handleListIndexChange({ startIndex, e, scrollTop })
    }
  }, delay)

  const [handlePullupLoadAction]: ((e?: SyntheticEvent, start?: number) => void)[] = useThrottle(async (e: SyntheticEvent) => {
    console.log('=== 上拉加载 ===')

    await handlePullupLoad(e)
  }, delay)

  return {
    listRef,
    wrapRef,
    loadingRef,
    listIndex,
    offsetY,
    scrollHeight,
    isLoading,
    loadTip,
    children,
    handleClick,
    hanleScrollAction,
  }
}
