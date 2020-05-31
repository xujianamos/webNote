## 1.select使用问题

### 1.1下拉显示选中，但是显示框还是选中的第一个

- 原因：选择框渲染完后需要重新渲染表格
- 解决：

1. 需要引用form模板

```js
layui.use(['form'], function () {
    var form = layui.form;
});
```

2. html

```js
<div class="layui-form">
    <select name="city" lay-verify="" lay-filter="test" id="select">
        <option value="">请选择一个城市</option>
        <option value="010">北京</option>
        <option value="021">上海</option>
        <option value="0571">杭州</option>
    </select>
</div>
```

==注==：当需要动态生成select选项时，如果没有layui的下拉效果，需要在生成完dom结构之后`form.render()`;一下，重新渲染。

- 扩展select的change事件

需要在select标签上增加lay-filter="test"，test可以随意命名。

```js
form.on('select(test)', function (data) {
    //TODO执行自己的代码
});
```

==注==：select(test)里面的test和lay-filter的值一样即可。