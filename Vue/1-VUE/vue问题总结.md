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

