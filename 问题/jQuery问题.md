## 1.Ajax

### 1.1ajax方法

- 语法

```js
var list = {};
        //
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://127.0.0.1/admin/list/",
            //数据，json字符串
            data : JSON.stringify(list),
            //请求成功
            success : function(result) {
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });
```

## 2.JQuery操作select下拉框

### 2.1获取Select选择的Text和Value

```javascript
//1.为Select添加事件，当选择其中一项时触发
$("#select_id").change(function(){//code...}); 
varcheckText=$("#select_id").find("option:selected").text(); //获取Select选择的Text
varcheckValue=$("#select_id").val(); //获取Select选择的Value
var checkIndex=$("#select_id").get(0).selectedIndex; //获取Select选择的索引值
var maxIndex=$("#select_idoption:last").attr("index"); //获取Select最大的索引值
```

### 2.2设置Select选择的Text和Value

bug：

`$(option).attr('selected', true)`这种设置一两次能选中，但是多次动态设置就会失效

```javascript
// 1.设置Select的Value值为4的项选中，此方法最简洁
	$("#select_id").val(4); 
//2.设置Select的Text值为jQuery的项选中
	$("#select_id option[text='jQuery']").attr("selected", true); 
	$(".selector").find("option[text='jQuery']").attr("selected",true);
```

### 2.3添加/删除Select的Option项

```javascript
$("#select_id").append("<optionvalue='Value'>Text</option>"); //为Select追加一个Option(下拉项)
$("#select_id").prepend("<optionvalue='0'>请选择</option>"); //为Select插入一个Option(第一个位置)
$("#select_idoption:last").remove(); //删除Select中索引值最大Option(最后一个)
$("#select_idoption[index='0']").remove(); //删除Select中索引值为0的Option(第一个)
$("#select_idoption[value='3']").remove(); //删除Select中Value='3'的Option
$("#select_idoption[text='4']").remove(); //删除Select中Text='4'的Option
```

### 2.4radio、checkbox、select取值，radio、checkbox、select选中，及其相关

```javascript
var item = $('input@name=items').val(); //获取一组radio被选中项的值
var item = $("select[@name=items]option[@selected]").text(); //获取select被选中项的文本
$('#select_id')[0].selectedIndex = 1; //select下拉框的第二个元素为当前选中值
$('input[@name=items]').get(1).checked = true; //radio单选组的第二个元素为当前选中值
```

### 2.5获取值

```javascript
$("#txt").attr("value"); //文本框，文本区域
$("#checkbox_id").attr("value"); //多选框 checkbox
$("input@type=radio").val(); //单选组radio
$('#sel').val(); //下拉框select
```

### 2.6控制表单元素

```javascript
$("#txt").attr("value",''); //清空文本框，文本区域内容
$("#txt").attr("value",'11'); //填充文本框，文本区域内容
```

### 2.7多选框checkbox

```javascript
$("#chk1").attr("checked",''); //不打勾
$("#chk2").attr("checked",true); //打勾
if($("#chk1").attr('checked')==undefined); //判断是否已经打勾

$("input[@type=checkbox][@checked]").val();    //得到复选框的选中的第一项的值
    $("input[@type=checkbox][@checked]").each(function()
    {
        //由于复选框一般选中的是多个,所以可以循环输出
        alert($(this).val());
    }
    );
```

### 2.8单选组radio

```javascript
$("input[@type=radio]").attr("checked",'2'); //设置value=2的项目为当前选中项
下拉框 select： $("#sel").attr("value",'-sel3'); //设置value=-sel3的项目为当前选中项
$("<optionvalue='1'>1111</option><optionvalue='2'>2222</option>").appendTo("#sel"); //添加下拉框的option
$("#sel").empty(); //清空下拉框
$("input@type=radio").val(); //得到单选框的选中项的值(注意中间没有空格)
$("input@type=radio").attr("checked",'checked'); //设置单选框value=2的为选中状态(注意中间没有空格)
```

### 2.9遍历option和添加、移除option

```javascript
function changeShipMethod(shipping)
{
    var len = $("select[@name=ISHIPTYPE]option").length
    if(shipping.value != "CA")
    {
        $("select[@name=ISHIPTYPE]option").each(function()
            {
                if($(this).val() == 111)
                {
                    $(this).remove();
                }
             });
    }
    else
    {
        $("<option value='111'>UPSGround</option>").appendTo($("select[@name=ISHIPTYPE]"));
    }
}
```

### 2.10取得下拉選單的選取值

```javascript
$(#testSelect option:selected').text();
$("#testSelect").find('option:selected').text();
$("#testSelect").val();
```

### 2.11下拉框

```javascript
//select[@name='country'] option[@selected] 表示具有name属性，并且该属性值为'country'的select元素里面的具有selected属性的option元素；有@开头的就表示后面跟的是属性
var cc1 = $(".formc select[@name='country']option[@selected]").text();    //得到下拉菜单的选中项的文本(注意中间有空格)
var cc2 = $('.formc select[@name="country"]').val();    //得到下拉菜单的选中项的值
var cc3 = $('.formc select[@name="country"]').attr("id");    //得到下拉菜单的选中项的ID属性值
$("#select").empty();    //清空下拉框//$("#select").html('');
$("<optionvalue='1'>1111</option>").appendTo("#select");    //添加下拉框的option
```

