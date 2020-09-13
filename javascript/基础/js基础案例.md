## 1.判断闰年案例

算法：能被4整除且不能整除100的为闰年（如2004年就是闰年，1901年不是闰年）或者能够被 400 整除的就是闰年

分析：

- 弹出prompt 输入框，让用户输入年份，把这个值取过来保存到变量中
- 使用 if 语句来判断是否是闰年，如果是闰年，就执行 if 大括号里面的输出语句，否则就执行 else里面的输出语句
- 一定要注意里面的且 &&  还有或者 || 的写法，同时注意判断整除的方法是取余为 0

```js
var year = prompt('请您输入年份：');
if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
     alert('您输入的年份是闰年');
} else {
     alert('您输入的年份是平年');
}
```

## 2.for循环案例

### 2.1求1-100之间所有数的平均值

需要一个 sum 和的变量 还需要一个平均值 average 变量

```js
var sum = 0;
        var average = 0;
        for (var i = 1; i <= 100; i++) {
            sum = sum + i;
        }
        average = sum / 100;
        console.log(average);
```

### 2.2求1-100之间所有偶数和奇数的和 

我们需要一个偶数的和变量 even  还需要一个奇数 odd

```js
var even = 0;
        var odd = 0;
        for (var i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                even = even + i;
            } else {
                odd = odd + i;
            }
        }
        console.log('1~100 之间所有的偶数和是' + even);
        console.log('1~100 之间所有的奇数和是' + odd);
```

### 2.3求1-100之间所有能被3整除的数字的和   

```js
var result = 0;
        for (var i = 1; i <= 100; i++) {
            if (i % 3 == 0) {
                // result = result + i;
                result += i;
            }
        }
        console.log('1~100之间能够被3整数的数字的和是：' + result);
```

### 2.4一行打印五个星星 

```js
var num = prompt('请输入星星的个数');
        var str = '';
        for (var i = 1; i <= num; i++) {
            str = str + '★'
        }
        console.log(str);
```

### 2.5打印五行五列星星

```js
var str = '';
        for (var i = 1; i <= 5; i++) { // 外层循环负责打印五行
            for (var j = 1; j <= 5; j++) { // 里层循环负责一行打印五个星星
                str = str + '★';
            }
            // 如果一行打印完毕5个星星就要另起一行 加 \n
            str = str + '\n';
        }
        console.log(str);
```

扩展：打印n行n列的星星

```js
var rows = prompt('请您输入行数:');
        var cols = prompt('请您输入列数:');
        var str = '';
        for (var i = 1; i <= rows; i++) {
            for (var j = 1; j <= cols; j++) {
                str = str + '★';
            }
            str += '\n';
        }
        console.log(str);
```

### 2.6打印倒三角形案例

```js
var str = '';
        for (var i = 1; i <= 10; i++) { // 外层循环控制行数
            for (var j = i; j <= 10; j++) { // 里层循环打印的个数不一样  j = i
                str = str + '★';
            }
            str += '\n';
        }
        console.log(str);
```

### 2.7九九乘法表

分析：

- 一共有9行，但是每行的个数不一样，因此需要用到双重 for 循环
- 外层的 for 循环控制行数 i ，循环9次 ，可以打印 9 行  
-  内层的 for 循环控制每行公式  j  
- 核心算法：每一行 公式的个数正好和行数一致， j <= i;
- 每行打印完毕，都需要重新换一行

```js
var str = '';
        for (var i = 1; i <= 9; i++) { // 外层循环控制行数
            for (var j = 1; j <= i; j++) { // 里层循环控制每一行的个数  j <= i
                // 1 × 2 = 2
                // str = str + '★';
                str += j + '×' + i + '=' + i * j + '\t';
            }
            str += '\n';
        }
        console.log(str);
```

## 3.数组案例

### 3.1求数组 [2,6,1,7, 4] 里面所有元素的和以及平均值

 (1)声明一个求和变量 sum。
(2)遍历这个数组，把里面每个数组元素加到 sum 里面。
(3)用求和变量 sum 除以数组的长度就可以得到数组的平均值。

```js
var arr = [2, 6, 1, 7, 4];
var sum = 0;
var average = 0;
for (var i = 0; i < arr.length; i++) {
     sum += arr[i]; // 我们加的是数组元素 arr[i] 不是计数器 i
}
average = sum / arr.length;
console.log(sum, average); // 想要输出多个变量，用逗号分隔即可
```

### 3.2求数组[2,6,1,77,52,25,7]中的最大值

- 声明一个保存最大元素的变量 max。
- 默认最大值可以取数组中的第一个元素。
- 遍历这个数组，把里面每个数组元素和 max 相比较。
- 如果这个数组元素大于max 就把这个数组元素存到 max 里面，否则继续下一轮比较。
- 最后输出这个 max

```js
var arr = [2, 6, 1, 77, 52, 25, 7, 99];
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        console.log('该数组里面的最大值是：' + max);
```

### 3.3将数组 ['red', 'green', 'blue', 'pink'] 转换为字符串，并且用 | 或其他符号分割

1. 需要一个新变量用于存放转换完的字符串 str。
2. 遍历原来的数组，分别把里面数据取出来，加到字符串里面。
3. 同时在后面多加一个分隔符

```js
var arr = ['red', 'green', 'blue', 'pink'];
        var str = '';
        var sep = '*';
        for (var i = 0; i < arr.length; i++) {
            str += arr[i] + sep;
        }
        console.log(str);
```

### 3.4数组存放1-10个值

核心原理：使用循环来追加数组。

1. 声明一个空数组 arr。
2. 循环中的计数器 i  可以作为数组元素存入。
3. 由于数组的索引号是从0开始的， 因此计数器从 0 开始更合适，存入的数组元素要+1。

```js
var arr = [];
        for (var i = 0; i < 10; i++) {
            // arr = i; 不要直接给数组名赋值 否则以前的元素都没了
            arr[i] = i + 1;
        }
        console.log(arr);
```

### 3.5筛选数组

将数组 [2, 0, 6, 1, 77, 0, 52, 0, 25, 7] 中大于等于 10 的元素选出来，放入新数组。

1. 声明一个新的数组用于存放新数据newArr。
2. 遍历原来的旧数组， 找出大于等于 10 的元素。
3. 依次追加给新数组 newArr。

方法1:

```js
var arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
        var newArr = [];
        var j = 0;//数组索引号
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] >= 10) {
                // 新数组索引号应该从0开始 依次递增
                newArr[j] = arr[i];
                j++;
            }
        }
        console.log(newArr);
```

方法2:

```js
var arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
        var newArr = [];
        // 刚开始 newArr.length 就是 0
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] >= 10) {
                // 新数组索引号应该从0开始 依次递增
                newArr[newArr.length] = arr[i];
            }
        }
        console.log(newArr);
```

### 3.6数组去重

将数组[2, 0, 6, 1, 77, 0, 52, 0, 25, 7]中的 0 去掉后，形成一个不包含 0 的新数组。

1. 需要一个新数组用于存放筛选之后的数据。
2. 遍历原来的数组， 把不是 0 的数据添加到新数组里面(此时要注意采用数组名 + 索引的格式接收数据)。
3. 新数组里面的个数， 用 length 不断累加。

```js
var arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                newArr[newArr.length] = arr[i];
            }
        }
        console.log(newArr);
```

### 3.7翻转数组

将数组 ['red', 'green', 'blue', 'pink', 'purple'] 的内容反过来存放

1. 声明一个新数组 newArr
2. 把旧数组索引号第4个取过来（arr.length - 1)，给新数组索引号第0个元素 (newArr.length)
3. 我们采取 递减的方式  i--

```js
var arr = ['red', 'green', 'blue', 'pink', 'purple', 'hotpink'];
        var newArr = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            newArr[newArr.length] = arr[i]
        }
        console.log(newArr);
```

### 3.8冒泡排序

```js
var arr = [4, 1, 2, 3, 5];
        for (var i = 0; i <= arr.length - 1; i++) { // 外层循环管趟数 
            for (var j = 0; j <= arr.length - i - 1; j++) { // 里面的循环管 每一趟的交换次数
                // 内部交换2个变量的值 前一个和后面一个数组元素相比较
                if (arr[j] < arr[j + 1]) {//大于号就是递增，小于号就是递减
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }

            }
        }
        console.log(arr);
```

