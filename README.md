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


- 组件纵览
```js
XUI
  |-VirtualList
  |-Loading
  |-Notify
```

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


- Notify
  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `type` | `string` | **Optional**. primary \| success \| danger \| warning \| info
  | `content` | `string` | **Required**. content
  | `title` | `string` | **Optional**. title
  | `duration` | `number` | **Optional**. duration
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }



- Loading
  | Parameter | Type     | Description                       |
  | :-------- | :------- | :-------------------------------- |
  | `imgSrc` | `string` | **Optional**. import imgSrc from xxx
  | `body` | `string \| Element` | **Optional**. string \| Element (document.querySelector)
  | `tip` | `string` | **Optional**. tip
  | `duration` | `number` | **Optional**. duration
  | `isMaskShow` | `boolean` | **Optional**. is show mask
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }
