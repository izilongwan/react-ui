import { SyntheticEvent } from 'react';

export interface VirtualListProps {
  visibleHeight?: string | number;
  children?: any[];
  colHeight?: number;
  belowPercentage?: number;
  abovePercentage?: number;
  showCount?: number;
  isLoaded?: boolean;
  delay?: number;
  pullupLoadOffset?: number;
  handlePullupLoad?: (e: SyntheticEvent, startIndex?: number) => void;
  handleClick?: (e: SyntheticEvent) => void;
  handleScroll?: (e: SyntheticEvent, startIndex?: number) => void;
}

export interface VirtualListPositionList {
  height: number;
  bottom: number;
  top: number;
  marginTop: number;
  marginBottom: number;
}
