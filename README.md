### @izilong/react-ui

- Install
```shell
$ npm i @izilong/react-ui
$ or yarn add @izilong/react-ui
```


- js
```shell
import ReactUI, { Toast, VurtualList } from '@izilong/react-ui'
```

Toast
```js
<!--type = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'loading'-->

Toast({ type, message, duration, isMaskShow, position })

Toast[type](message, duration, isMaskShow, position)

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