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
Notify({ type, content, duration, isMaskShow, style })

Notify[type](content, duration, isMaskShow, style)

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
| `content` | `string` | **Required**. content
| `title` | `string` | **Optional**. title
| `duration` | `number` | **Optional**. duration
| `style` | `object` | **Optional**. {top: 10%, left: 50%}



```js
  Loading
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgSrc` | `string` | **Optional**. import imgSrc from xxx
| `tip` | `string` | **Optional**. tip
| `duration` | `number` | **Optional**. duration
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `style` | `object` | **Optional**. {top: 10%, left: 50%}
