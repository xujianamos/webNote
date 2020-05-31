## 1.路径跳转

- 问题

在子页面使用window.location.href只能在子页面打开此路径，此时浏览器的路径不会有变化，只是子路径变了。如果需要修改浏览器的路径，需要使用top.location.href进行跳转

- 示例

```js
//此时只能在当前页面打开登录页面
window.location.href = location.origin + '/login.html'
//此时在顶层打开登录页面
top.location.href = location.origin + '/login.html'
```

- 扩展

```js
//本页面跳转
"window.location.href"、"location.href"
// 当前页面打开URL页面
self.location.href="/url"
//当前页面打开URL页面
location.href="/url" 
//当前页面打开URL页面，前面三个用法相同。
windows.location.href="/url"
//当前页面打开URL页面
this.location.href="/url" 
//在父页面打开新页面，上一层页面跳转
parent.location.href="/url" 
//在顶层页面打开新页面，最外层的页面跳转
top.location.href="/url" 
//在顶层页面刷新
"top.location.reload();": 
```

如果页面中自定义了frame，那么可将parent self top换为自定义frame的名称,效果是在frame窗口打开url地址

此外，window.location.href=window.location.href;和window.location.Reload()和都是

刷新当前页面。区别在于是否有提交数据。当有提交数据时，

window.location.Reload()会提示是否提交，

window.location.href=window.location.href;则是向指定的url提交数据