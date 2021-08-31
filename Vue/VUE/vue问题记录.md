## 1.vue切换路由模式{hash/history}

### 1.1vue中常用的路由模式

* `hash(#)`：默认路由模式
* `histroy(/)`:切换路由模式

### 1.2切换路由模式

```javascript
export default new Router({
    // 路由模式：hash(默认)，history模式
    mode: 'history',
    // 修改路由高亮样式，默认值为'router-link-active'
    linkActiveClass: 'active'
    //路由规则
    routes:[
        {
            path:'/',
            name:'index',
            component:'Index'
        }
    ],

})
```

# 2.$attrs不能覆盖同名属性？

# 3.vue中computed、watch、methods与生命周期的执行顺序

结论：

（1）在created时，已经可以使用用data和prop中的数据了

（2）页面**首次加载**时，computed会执行一次，并且是在`beforeMount之后，mounted之前`

（3）在页面数据发生变化时

- 如果不是由点击事件造成的数据变化（比如在mounted中修改数据），执行顺序为：`watch——beforeUpdate——computed——updated`
- 如果是由**点击事件**造成的数据变化，执行顺序为：`methods——watch——beforeUpdate——computed——updated`

5、computed、watch、methods的区别？

- computed和watch，只有依赖和监听的值发生了变化，才会调用相关属性和函数，而methods中，不管数据有没有变化，只要触发事件，就会调用函数
- computed和watch，computed具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数;watch无缓存性，页面重新渲染时值不变化也会执行

