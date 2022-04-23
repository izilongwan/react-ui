import React, { LegacyRef } from 'react';
import { useVirtualList } from './hook';
import styles from './index.module.scss';
import { VirtualListProps } from './types';
import imgSrc from '@/assets/images/loading-2.gif'

const VirtualList = (props: VirtualListProps) => {
  const {
    isLoaded,
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

      <div className={ styles['virtual-list-wrap_scroll-bar'] } style={ { height: scrollHeight + 'px' } }></div>

      <div className={ styles['virtual-list-wrap_content'] } style={ { transform: `translateY(${ offsetY }px)` } } onClick={ handleClick }>

        <ul className={ styles['virtual-list-wrap_list'] } ref={ listRef as LegacyRef<HTMLUListElement> }>
          {
            React.Children.map(
              children.slice(listIndex.start, listIndex.end),
              (child, idx) => {
                return React.cloneElement(child, { 'data-virtual-idx': listIndex.start + idx })
              }
            )
          }
        </ul>

        <p className={ `${ styles['virtual-list-wrap_content_load'] } ${ isLoading ? styles['show'] : '' }` }>
          <img className={ `${ styles['virtual-list-wrap_content_load_img'] } ${ isLoaded ? styles.hide : '' }` } src={ imgSrc } alt="loading" />

          <span className={ styles['virtual-list-wrap_content_load_tip'] }>{ loadTip }</span>
        </p>
      </div>
    </div>
  );
};

export default VirtualList;
