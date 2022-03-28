import React, {
  LegacyRef,
} from 'react'
import { useVirtualList } from './hook'

import styles from './index.module.scss'

import {
  VirtualListProps,
} from './types'

const VirtualList = (props: VirtualListProps) => {
  const {
    listRef,
    wrapRef,
    listIndex,
    isLoading,
    offsetY,
    scrollHeight,
    loadTip,
    children,
    handleClick,
    hanleScrollAction,
  } = useVirtualList(props)

  return (
    <div className={ styles['virtual-list-wrap'] } ref={ wrapRef as LegacyRef<HTMLDivElement> } onScroll={ hanleScrollAction }>
      <div className={ styles['virtual-scroll-bar'] } style={ { height: scrollHeight + 'px' } }></div>
      <div className={ styles['virtual-content'] } style={ { transform: `translateY(${ offsetY }px)` } } onClick={ handleClick }>
        <ul className={ styles['virtual-list'] } ref={ listRef as LegacyRef<HTMLUListElement> }>
          {
            React.Children.map(
              children.slice(listIndex.start, listIndex.end),
              (child, idx) => {
                return React.cloneElement(child, { 'data-virtual-idx': listIndex.start + idx })
              }
            )
          }
        </ul>
        <p className={ [styles['virtual-load-tip'], isLoading ? styles['show'] : ''].join(' ') }>{ loadTip }</p>
      </div>
      {/* <span style={ { position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)' } }>{ positionList.length }</span> */ }
    </div>
  );
};

export default VirtualList;
