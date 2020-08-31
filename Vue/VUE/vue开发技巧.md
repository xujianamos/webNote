## 1.学会使用`$attrs` 与 `$listeners`，二次包装组件就靠它了

前几天产品经理给我甩过来一份管理系统的设计原型，我打开看了看，虽然内心是拒绝的，但是为了活着，还是要做的。小编看了看原型，发现系统中的大部分弹框右下角都是确定和取消两个按钮。如果使用element-ui提供的`Dialog`，那么每一个弹框都要手动加按钮，不但代码量增多，而且后面如果按钮UI，需求发生变化，改动量也比较大。

```js
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
```

如果可以将`Dialog`进行二次封装，将按钮封装到组件内部，就可以不用重复去写了。

### 定义基本弹框代码

```vue
<template>
  <el-dialog :visible.sync="visibleDialog">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible",val);
      }
    }
  },
  methods: {
    // 对外抛出cancel事件
    $_handleCancel() {
      this.$emit("cancel");
    },
    // 对外抛出 confirm事件
    $_handleConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>
```

通过上面的代码，我们已经将按钮封装到组件内部了。

使用如下：

```html
<!--外部使用方式 confirm cancel 是自定义的事件 opened是包装el-dialog的事件，通过$listeners传入到el-dialog里面-->
<custom-dialog :visible.sync="visibleDialog" @opened="$_handleOpened" @confirm="$_handleConfirm" @cancel="$_handleCancel">这是一段内容</custom-dialog>

```

但上面的代码存在一个问题，无法将`Dialog`自身的属性和事件暴露到外部（虽然可以通过`props`及`$emit`一个一个添加，但是很麻烦）,这时候就可以使用`$attrs`与`$listeners`

#### 使用`$attrs`与`$listeners`

`$attrs`: 当组件在调用时传入的属性没有在`props`里面定义时，传入的属性将被绑定到`$attrs`属性内（`class`与`style`除外，他们会挂载到组件最外层元素上）。并可通过`v-bind="$attrs"`传入到内部组件中

`$listeners`: 当组件被调用时，外部监听的这个组件的所有事件都可以通过`$listeners`获取到。并可通过`v-on="$listeners"`传入到内部组件中。

修改弹框代码：

```vue
<!---使用了v-bind与v-on监听属性与事件-->
<template>
    <el-dialog :visible.sync="visibleDialog" v-bind="$attrs" v-on="$listeners">
    <!--其他代码不变-->
    </el-dialog>
</template>
<script>
  export default {
    //默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 
    //将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
    //通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
    inheritAttrs: false
 }
</script>

<!---外部使用方式-->
<custom-dialog
  :visible.sync="visibleDialog"
  title="测试弹框"
  @opened="$_handleOpened"
>
  这是一段内容
</custom-dialog>
```

对于`$attrs`，我们也可以使用`$props`来代替,实现代码如下

```vue
<template>
  <el-dialog :visible.sync="visibleDialog" v-bind="$props" v-on="$listeners">
    <!--其他代码不变-->
  </el-dialog>
</template>
<script>
import { Dialog } from 'element-ui'
export default {
  props: {
    // 将Dialog的props通过扩展运算符展开到props属性里面
    ...Dialog.props
  }
}
</script>

```

但上面的代码存在一定的缺陷，有些组件存在非`props`的属性，比如对于一些封装的表单组件，我们可能需要给组件传入原生属性，但实际原生属性并没有在组件的`props`上面定义，这时候，如果通过上面的方式去包装组件，那么这些原生组件将无法传递到内部组件里面。

## 2. 使用`require.context`实现前端工程自动化

`require.context`是一个`webpack`提供的Api,通过执行`require.context`函数获取一个特定的上下文,主要是用于实现自动化导入模块。

什么时候用？ 当一个js里面需要手动引入过多的其他文件夹里面的文件时，就可以使用。

在Vue项目开发过程中，我们可能会遇到这些可能会用到`require.context`的场景

1. 当我们路由页面比较多的时候，可能会将路由文件拆分成多个，然后再通过`import`引入到`index.js`路由主入口文件中
2. 当使用svg symbol时候，需要将所有的svg图片导入到系统中（建议使用svg-sprite-loader）
3. 开发了一系列基础组件，然后把所有组件都导入到`index.js`中，然后再放入一个数组中，通过遍历数组将所有组件进行安装。

对于上述的几个场景，如果我们需要导入的文件比较少的情况下，通过`import`一个一个去导入还可以接受，但对于量比较大的情况，就变成了纯体力活，而且每次修改增加都需要在主入口文件内进行调整。这时候我们就可以通过`require.context`去简化这个过程。

现在以上述第三条为例,来说明`require.context`的用法

#### 常规用法

组件通过常规方式安装

```js
import Login from '../views/login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/users/users.vue'
import Rights from '../views/power/Rights.vue'

const components = [
	Login,Home,Welcome,Users,Rights
]
components.forEach(item=>{
	Vue.component(item.name,item)
})
```

#### `require.context`基本语法

```js
/**
*directory：要扫描的目录
*useSubdirectories：是否扫描所有的子级文件夹
*regExp：要扫描的文件，用正则进行匹配
*/
require.context(directory，useSubdirectories=false，regExp=/^\.\//)
```

#### 通过`require.context`安装`Vue`组件

```js
/**
*directory=./ 扫描当前目录下面的所有文件
*useSubdirectories=false，表示不需要地柜扫描所有的子文件夹
*regExp=/\.vue$/所有以.vue结束的文件
*/
const context=require.context('./',false,/\.vue$/)
/**
*context.keys()返回所有匹配到的文件的路径
*/
context.keys().forEach(key=>{
//通过context(key)可以获取到对应的文件.default表示export default导出的内容
component=context(key).default
//安装vue组件
Vue.component(component.name，component)
})
```

## 3.自定义`v-model`,原来这么简单

在用Vue开发前端时，不论使用原生还是封装好的UI库，对于表单组件，一般都会使用到`v-model`。虽然`v-model`是一个语法糖，但是吃到嘴里挺甜的啊。学会自定义`v-model`，还是很有必要的。

#### 基本用法

一个组件上的`v-model`默认是通过在组件上面定义一个名为`value`的props,同时对外暴露一个名为`input`的事件。

源码：

```vue
<template>
  <div class="custom-input">
    <input :value="value" @change="$_handlechange" />
  </div>
</template>
<script>
export default {
  props: {
    //定义一个名为value的属性
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    $_handleChange(e) {
      //对外暴露一个input事件
      this.$emit('input', e.target.value)
    },
  },
}
</script>

```

使用方式：

```html
<custom-input v-model="text"></custom-input>
```

#### 自定义属性与事件

通常情况下，使用`value`属性与`input`事件没有问题，但是有时候有些组件会将`value`属性或`input`事件用于不同的目的，比如对于单选框、复选框等类型的表单组件的`value`属性就有其他用处。或者希望属性名称或事件名称与实际行为更贴切，比如`active`,`checked`等属性名。

```vue
<template>
  <!--开关组件，通过样式控制开关组件的状态-->
  <div :class="['custom-switch',active 6&‘custom-switch__acitive']" @click="$_handleclick">
    <!--开关组件内部的开关-->
    <span class="custom-switch__core"></span>
  </div>
</template>
<script>
export default {
  //通过mode1可以自定义属性名和事件名
  model: {
    event: 'change',
    prop: 'active',
  },
  props: {
    //定义一个名为active的属性
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    $_handleClick() {
      //对外暴露一个change事件
      this.$emit('change', !this.active)
    },
  },
}
</script>

```

## 4. 使用`.sync`,更优雅的实现数据双向绑定

在`Vue`中，`props`属性是单向数据传输的,父级的prop的更新会向下流动到子组件中，但是反过来不行。可是有些情况，我们需要对prop进行“双向绑定”。上文中，我们提到了使用`v-model`实现双向绑定。但有时候我们希望一个组件可以实现多个数据的“双向绑定”，而`v-model`一个组件只能有一个(Vue3.0可以有多个)，这时候就需要使用到`.sync`。

#### `.sync`与`v-model`的异同

相同点：

- 两者的本质都是语法糖，目的都是实现组件与外部数据的双向绑定
- 两个都是通过属性+事件来实现的

不同点(个人观点，如有不对，麻烦下方评论指出，谢谢)：

- 一个组件只能定义一个`v-model`,但可以定义多个`.sync`
- `v-model`与`.sync`对于的事件名称不同，`v-model`默认事件为`input`,可以通过配置`model`来修改，`.sync`事件名称固定为`update:属性名`

#### 自定义`.sync`

在开发业务时，有时候需要使用一个遮罩层来阻止用户的行为（更多会使用遮罩层+loading动画），下面通过自定义`.sync`来实现一个遮罩层

```vue
<template>
  <!-- 遮置层 -->
  <div class="custom-overlay" v-show="visible" @click="$_handleclick"></div>
</template>
<script>
export default {
  props: {
    //定义控制遮置层显示隐藏的属性
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    $_handleClick() {
      //通过update:visible 事件修改外部传入的visible属性的值
      this.$emit('update:visible', false)
    },
  },
}
</script>

```

使用方式

```html
<!--调用方式-->
<template>
  <custom-overlay :visible.sync="visible" />
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

```

## 5.动态组件，让页面渲染更灵活

前两天产品经理来了新的需求了，告诉我，需要根据用户的权限不同，页面上要显示不同的内容，然后我就哼哧哼哧的将不同权限对应的组件写了出来，然后再通过`v-if`来判断要显示哪个组件，就有了下面的代码

```html
 <div class="info">
    <template v-if="role === 'admin'">
      <admin-info></admin-info>
    </template>
    <template v-else-if="role === 'user'">
      <user-info></user-info>
    </template>
    <template v-else-if="role === 'hr'">
      <hr-info></hr-info>
    </template>
    <template v-else>
      <welcom-info></welcom-info>
    </template>
  </div>
```

但是看到上面代码的那一长串`v-if`,`v-else-if`,我感觉我的代码洁癖症要犯了，不行，这样`code review`过不了关，我连自己这一关都过不了，这时候就改动态组件发挥作用了。

```vue
<template>
  <div class="info">
    <component :is="roleComponent" v-if="roleComponent" />
  </div>
</template>
<script>
import AdminInfo from './admin-info'
import BookkeeperInfo from './bookkeeper-info'
import HrInfo from './hr-info'
import UserInfo from './user-info'
export default {
  components: {
    AdminInfo,
    BookkeeperInfo,
    HrInfo,
    UserInfo
  },
  data() {
    return {
      roleComponents: {
        admin: AdminInfo,
        bookkeeper: BookkeeperInfo,
        hr: HrInfo,
        user: UserInfo
      },
      role: 'user',
      roleComponent: undefined
    }
  },
  created() {
    const { role, roleComponents } = this
    this.roleComponent = roleComponents[role]
  }
}
</script>

```

## 6.`mixins`，更高效的实现组件内容的复用

`mixins`是`Vue`提供的一种混合机制，用来更高效的实现组件内容的复用。怎么去理解混入呢，我觉得和`Object.assign`，但实际与`Object.assign`又有所不同。

#### 基本示例

在开发echarts图表组件时，需要在窗口尺寸发生变化时，重置图表的大小，此时如果在每个组件里面都去实现一段监听代码，代码重复太多了，此时就可以使用混入来解决这个问题

```js
// 混入代码 resize-mixins.js
import { debounce } from 'lodash'
const resizeChartMethod = '$__resizeChartMethod'

export default {
  data() {
    // 在组件内部将图表init的引用映射到chart属性上
    return {
      chart: null
    }
  },
  created() {
    window.addEventListener('resize', this[resizeChartMethod])
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this[resizeChartMethod])
  },
  methods: {
    // 通过lodash的防抖函数来控制resize的频率
    [resizeChartMethod]: debounce(function() {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
  }
}
```



```vue
<!--图表组件代码-->
<template>
  <div class="chart"></div>
</template>
<script>
import echartMixins from './echarts-mixins'
export default {
  // mixins属性用于导入混入，是一个数组，数组可以传入多个混入对象
  mixins: [echartMixins],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
  }
}
</script>

```

#### 不同位置的混入规则

在`Vue`中，一个混入对象可以包含任意组件选项，但是对于不同的组件选项，会有不同的合并策略。

1. `data` 对于`data`,在混入时会进行递归合并，如果两个属性发生冲突，则以组件自身为主，如上例中的`chart`属性
2. 生命周期钩子函数

对于生命周期钩子函数，混入时会将同名钩子函数加入到一个数组中，然后在调用时依次执行。混入对象里面的钩子函数会优先于组件的钩子函数执行。如果一个组件混入了多个对象，对于混入对象里面的同名钩子函数，将按照数组顺序依次执行，如下代码:

```js
const mixin1 = {
  created() {
    console.log('我是第一个输出的')
  }
}

const mixin2 = {
  created() {
    console.log('我是第二个输出的')
  }
}
export default {
  mixins: [mixin1, mixin2],
  created() {
    console.log('我是第三个输出的')
  }
}

```

3. 其他选项 对于值为对象的选项，如`methods`,`components`,`filter`,`directives`,`props`等等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

#### 全局混入

混入也可以进行全局注册。一旦使用全局混入，那么混入的选项将在所有的组件内生效，如下代码所示：

```js
Vue.mixin({
  methods: {
    /**
     * 将埋点方法通过全局混入添加到每个组件内部
     * 
     * 建议将埋点方法绑定到Vue的原型链上面，如： Vue.prototype.$track = () => {}
     * */
    track(message) {
      console.log(message)
    }
  }
})

复制代码
```

**请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，**