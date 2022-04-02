### @izilong/react-ui

- Install
```shell
$ npm i @izilong/react-ui
$ or yarn add @izilong/react-ui
```


- js
```shell
import ReactUI, { Notify, VurtualList, Loading } from '@izilong/react-ui'
import '@izilong/react-ui/dist/css/index.css'
```

Notify
```js
Notify({ type, message, duration, isMaskShow, position })

Notify[type](message, duration, isMaskShow, position)

```


- VirtualList
```jsx
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

## API Reference

```js
  Notify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Optional**. primary / success / danger / warning / info
| `message` | `string` | **Optional**. message
| `title` | `string` | **Optional**. title
| `duration` | `number` | **Optional**. duration
| `position` | `object` | **Optional**. {top: 10%, left: 50%}



```js
  Loading
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgSrc` | `string` | **Optional**. img src
| `message` | `string` | **Optional**. message
| `duration` | `number` | **Optional**. duration
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `position` | `object` | **Optional**. {top: 10%, left: 50%}
