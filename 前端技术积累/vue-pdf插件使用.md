# 1.安装

```bash
npm install --save vue-pdf
```

# 2.快速使用

```vue
<template>
<div><pdf ref="pdf" :src="url"></pdf>
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  components:{
      pdf
  },
  data(){
      return {
          url:"http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      }
  }
</script> 
```

注意：此时默认只显示了pdf的第一页

# 3.直接显示完所有页面

直接v-for 循环，直接显示完。

```js
<template>
  <div>
    <pdf v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  data() {
    return {
      url: '',
      numPages: 1
    }
  },
  mounted: function() {
    this.getNumPages('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf')
  },
  methods: {
    getNumPages(url) {
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask
        .then(pdf => {
          this.url = loadingTask
          this.numPages = pdf.numPages
        })
        .catch(err => {
          console.error('pdf加载失败')
        })
    }
  }
}
</script>
```

各个属性：

- `url` ：pdf 文件的路径，可以是本地路径，也可以是在线路径。
- `numPages` ： pdf 文件总页数。

`getNumPages` 计算总页数，顺便给url和numPages赋值。

唯一需要大家注意的是这句：

```js
this.getNumPages("http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf")
```

注意啊，这句不一定非要写到mounted里面，你想写哪就写哪，比如你前端请求后端，后端返回一个pdf 的url，在那里写就行，写在你需要的地方。

# 4.每次只显示一页

当pdf有一千页，浏览器渲染就会崩溃。因此需要分页显示。

```vue
<template>
	<div>
		<div class="tools">
			<bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="prePage" class="mr10"> 上一页</bk-button>
			<bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="nextPage" class="mr10"> 下一页</bk-button>
			<div class="page">{{pageNum}}/{{pageTotalNum}} </div>
			<bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="clock" class="mr10"> 顺时针</bk-button>
			<bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="counterClock" class="mr10"> 逆时针</bk-button>
		</div>
		<pdf ref="pdf" 
		:src="url" 
		:page="pageNum"
		:rotate="pageRotate"  
		@progress="loadedRatio = $event"
		@page-loaded="pageLoaded($event)" 
		@num-pages="pageTotalNum=$event" 
		@error="pdfError($event)" 
		@link-clicked="page = $event">
		</pdf>
	</div>
</template>
<script>
	import pdf from 'vue-pdf'
	export default {
		name: 'Home',
		components: {
			pdf
		},
		data() {
			return {
				url: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
				pageNum: 1,
				pageTotalNum: 1,
				pageRotate: 0,
				// 加载进度
				loadedRatio: 0,
				curPageNum: 0,
			}
		},
		mounted: function() {},
		methods: {
            // 上一页函数，
			prePage() {
				var page = this.pageNum
				page = page > 1 ? page - 1 : this.pageTotalNum
				this.pageNum = page
			},
            // 下一页函数
			nextPage() {
				var page = this.pageNum
				page = page < this.pageTotalNum ? page + 1 : 1
				this.pageNum = page
			},
            // 页面顺时针翻转90度。
			clock() {
				this.pageRotate += 90
			},
            // 页面逆时针翻转90度。
			counterClock() {
				this.pageRotate -= 90
			},
            // 页面加载回调函数，其中e为当前页数
			pageLoaded(e) {
				this.curPageNum = e
			},
            // 其他的一些回调函数。
			pdfError(error) {
				console.error(error)
			},
		}
	}
</script>
```

参数介绍：

- `page`: 当前显示的页数，比如第一页page=1
- `rotate` ： 旋转角度，比如0就是不旋转，+90，-90 就是水平旋转。
- `progress` ：当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了。
- `page-loaded` ：页面加载成功的回调函数，不咋能用到。
- `num-pages` ：总页数
- `error` ：加载错误的回调
- `link-clicked`：单机pdf内的链接会触发。

其他：

- print 这个是打印函数。 注意：谷歌浏览器会出现乱码，这个和字体有关系。

其他骚操作：

```js
// 打印全部
pdfPrintAll() {
	this.$refs.pdf.print()
},
// 打印指定部分
pdfPrint() {
	this.$refs.pdf.print(100, [1, 2])
},
```

# 5.如何加载本地pdf文件

需要我们做一下本地配置flie-loader才行，否则webpack无法编译pdf类型的文件，配置方法也很简单，在项目根目录新建一个vue.config.js文件，我发现很多人直接就去babel.config.js这个文件里面配置，这样是不对的，肯定会报错。

先安装file-loader:

```bash
npm install --save file-loader
```

然后在vue.config.js中加入以下内容：

```js
module.exports = {
    chainWebpack: config => {
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.pdf|ico$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                limit: 10000,
            })
    },
    publicPath: './'
}
```

之后再`url:require("../assets/1.pdf")`就没有任何问题了，注意，vue-pdf src接收的是string对象，如果直接传url我这里报错了，你可能需要传`url.default`一下。

# 6.跨域问题：

网上用pdf.js 很多都会遇到跨域问题，这个我今天实际应用到自己的项目里面了，由于我服务端设置了跨域，所以没有出现跨域的问题，如果出现跨域需要修改你后端的请求头。

# 7.打印界面字符乱码：

这个我倒是碰到了，谷歌浏览器打印的时候，预览界面真的变成了 真·方块字 ，全是方块。这个问题是因为你pdf中使用了自定义字体导致的，具体解决方案如下：

首先，找到这个文件：`node_modules/vue-pdf/src/pdfjsWrapper.js`

然后根据github上这个issue，其中红色的是要删掉的，绿色的是要加上去的，照着改就可以解决了。

地址： [github.com/FranckFreib…](https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7)

根据我的实际测试，是可以解决打印乱码的问题的。