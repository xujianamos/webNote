## 1.全网站变灰色

复制下面的代码，放在你的网站`<head></head>`之间即可实现全站黑白显示。

```css
<style>
html {
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(100%);
}
</style>
```

