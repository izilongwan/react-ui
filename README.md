### @izilong/react-ui

- 安装｜install
```shell
npm i @izilong/react-ui
```
```shell
yarn add @izilong/react-ui
```

- 使用｜use
```js
import XUI from '@izilong/react-ui'
```
- 引入CSS
```js
import '@izilong/react-ui/dist/css/index.css'
```

## API Reference


- 组件总览
```js
XUI
  |-Button
  |-Confirm
  |-Icon
  |-Loading
  |-Notify
  |-VirtualList
```


- Button
    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | `size` | `string` | **Optional**. mini \| normal \| large
    | `type` | `string` | **Optional**. primary \| success \| danger \| warning \| info \| default


- Confirm
    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | `content` | `string` | **Required**. content
    | `title` | `string` | **Optional**. title
    | `type` | `string` | **Optional**. type
    | `leftText` | `number` | **Optional**. leftText
    | `rightText` | `number` | **Optional**. rightText
    | `autoClose` | `boolean` | **Optional**. after click opteration auto close
    | `isMaskShow` | `boolean` | **Optional**. is show mask
    | `style` | `object` | **Optional**. { top: 10%, left: 50% }


- Icon
    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | `size` | `number` | **Optional**.
    | `color` | `string` | **Optional**. #fcc
    | `type` | `string` | **Optional**. icon-primary \| icon-success \| icon-danger \| icon-warning \| icon-info


- Loading
  | Parameter | Type     | Description                       |
  | :-------- | :------- | :-------------------------------- |
  | `imgSrc` | `string` | **Optional**. import imgSrc from xxx
  | `body` | `string \| Element` | **Optional**. string \| Element (document.querySelector)
  | `tip` | `string` | **Optional**. tip
  | `duration` | `number` | **Optional**. duration
  | `isMaskShow` | `boolean` | **Optional**. is show mask
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }


- Notify
  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `type` | `string` | **Optional**. primary \| success \| danger \| warning \| info
  | `content` | `string` | **Required**. content
  | `title` | `string` | **Optional**. title
  | `duration` | `number` | **Optional**. duration
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }


- VirtualList
  ```js
    <VirtualList visibleHeight={ 400 } handlePullupLoad={ addListData }>
      {
        listData.map(item => {
          return (
            <li className="item" key={ item.id }>{ item.id } { item.text }</li>
          )
        })
      }
    </VirtualList>
  ```
