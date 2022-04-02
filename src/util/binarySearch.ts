export function binarySearch (array: { bottom: number }[], tar: number): number {
  let leftIdx = 0,
      rightIdx = array.length - 1,
      middleIdx = 0,
      tempIdx = -1,
      value = null

  while (leftIdx <= rightIdx) {
    middleIdx = ~~((leftIdx + rightIdx) / 2)
    value = array[middleIdx].bottom

    if (value === tar) {
      return middleIdx
    }
    else if(value < tar) {
      leftIdx = middleIdx + 1
    }
    else {
      if (tempIdx === -1 || tempIdx > middleIdx) {
        tempIdx = middleIdx
      }

      rightIdx = middleIdx - 1
    }
  }

  return tempIdx
}
