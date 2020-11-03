





![image-20201103173913674](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20201103173913674.png)



```js
let obj = {
    name: ''
}
// 监听数据的变化
Object.keys(obj).forEach(key => {
    let value = obj[key]

    Object.defineProperty(obj, key, {
        get() {
            // 监听哪些用到值
            return value
        },
        set(newvalue) {
            // 监听key的变化
            value = newvalue
            dep.notify()
        }
    })
})

// 发布者
class Dep {
    constructor() {
        // 保存订阅者
        this.subs = []
    }
    // 添加订阅者
    addsub(watcher) {
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(item=>{
            item.update()
        })
    }

}

// 订阅者
class watcher {
    constructor(name) {
        this.name = name
    }
    // 更新值
    update() {

    }
}
const dep = new Dep()

const w1 = new watcher('张三')
dep.addsub(w1)
```



