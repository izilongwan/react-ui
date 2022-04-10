### @izilong/react-ui

- Install｜安装
```shell
npm i @izilong/react-ui
```
```shell
yarn add @izilong/react-ui
```


- js中引入
```js
import ReactUI, { Notify, VurtualList, Loading } from '@izilong/react-ui'
```
```js
import '@izilong/react-ui/dist/css/index.css'
```


## API Reference

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
  | `type` | `string` | **Optional**. primary\|success\|danger\|warning\|info
  | `content` | `string` | **Required**. content
  | `title` | `string` | **Optional**. title
  | `duration` | `number` | **Optional**. duration
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }



- Loading  
  | Parameter | Type     | Description                       |
  | :-------- | :------- | :-------------------------------- |
  | `imgSrc` | `string` | **Optional**. import imgSrc from xxx
  | `tip` | `string` | **Optional**. tip
  | `duration` | `number` | **Optional**. duration
  | `isMaskShow` | `boolean` | **Optional**. is show mask
  | `style` | `object` | **Optional**. { top: 10%, left: 50% }
