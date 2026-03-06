---
title: "弹出消息与模态框"
sidebar_label: "弹出消息与模态框"
---

# 弹出消息与模态框

在 Scheduler 中，消息用于通知用户错误、确认或拒绝操作、选择选项等。Scheduler 的消息基于 [dhtmlxMessage 仓库的一个分支](https://github.com/DHTMLX/message)，因此 dhtmlxMessage 的所有特性同样适用于 dhtmlxScheduler 的消息。

消息主要分为两类:[简单弹出消息框](#basicpopupmessage) 和带有按钮、可阻止应用交互的 [模态消息框](#modalmessageboxes)。

模态消息框可分为三种类型:

- [警告消息框](#alert)
- [确认消息框](#confirm)
- [模态框](#modal)

## 简单弹出消息框

要显示一个基本的模态消息框，请使用 [scheduler.message](api/method/message.md) 方法。唯一必需的参数是消息文本:

~~~js
scheduler.message("The event is updated");
~~~

消息框有三种类型:

- 默认消息框（**type:"info"**）

![default_message](/img/default_message.png)
  
- 错误消息框（**type:"error"**）

![error_message](/img/error_message.png)

- 警告消息框（**type:"warning"**）

![warning_message](/img/warning_message.png)

要创建特定类型的消息框，请将 *type* 属性设置为相应的值:

~~~js
// 创建错误消息框
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[Different types of popups and modal boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


如需自定义消息框的外观，可以通过 type 参数指定 CSS 类，详见[此处](#styling)。

### 消息框的位置

默认情况下，弹出消息框出现在窗口的右上角。与 [模态消息框](#modalmessageboxes) 不同，弹出消息框不会阻止与应用的交互。可通过设置 **scheduler.message.position** 属性更改位置:

~~~js
scheduler.message.position = 'bottom';
~~~

可选的位置值有:

- **top** - 在右上角显示消息框（默认）
- **bottom** - 在右下角显示消息框
- **left** - 在 Scheduler 下方左侧显示消息框
- **right** - 在 Scheduler 下方右侧显示消息框

### 消息持续时间

通过设置 *expire* 参数（单位:毫秒），可以控制消息框显示的时长。默认值为 4000 毫秒。

如需更改显示时长或阻止消息自动消失，将 *expire* 设置为 "-1"。此时，只有点击消息框才会关闭。

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### 通过 API 隐藏消息框

如需在消息未到期前手动关闭特定消息框，请使用 **scheduler.message.hide(boxId)** 方法。它接收一个参数:

- **boxId** - 创建消息框时分配的 ID

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## 模态消息框

模态消息框会阻止与父应用的交互，直到用户点击按钮完成操作。点击按钮后，消息框关闭，并执行任何回调函数。

模态消息框分为三种:

- [警告消息框](#alert) -- 带有单个按钮的警告框
- [确认消息框](#confirm) -- 带有两个按钮（确认或取消）的确认框
- [模态框](#modal) -- 可自定义按钮数量的模态框

常用属性包括:

- **id** - 消息框的 ID
- **title** - 标题文本
- **type** - 消息类型（如 warning 或 error）
- **text** - 消息正文
- **ok** - "OK" 按钮文本
- **cancel** - "Cancel" 按钮文本（仅用于确认框）
- **callback** - 按钮点击时调用的函数，根据按钮返回 *true* 或 *false*
- **position** - 目前仅支持 "top"；其他值会使消息框居中
- **width** - 模态框宽度（CSS [长度](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [百分比](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)，如 "100px"、"50%"）
- **height** - 模态框高度（CSS [长度](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [百分比](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)，如 "100px"、"50%"）

## 警告消息框 (#alert)

![alert](/img/alert.png)

警告框包含一个 "OK" 按钮。可通过 *ok* 参数设置按钮文本:

- 简写形式（仅指定消息文本，*text* 隐式设置，其他参数为默认值）:

~~~js
scheduler.alert("Text");
~~~

- 完整形式（可设置多个参数，未指定的采用默认值）:

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~

## 确认消息框 (#confirm)

![confirm](/img/confirm.png)

确认框包含两个按钮:"OK" 和 "Cancel"，按钮文本通过相应属性设置。

- 简写形式

~~~js
scheduler.confirm("ConfirmText");
~~~

- 完整形式

~~~js
scheduler.confirm({
    title:"Confirm",
    text:"This is a simple confirm",
    ok:"Ok",
    cancel:"Cancel",
    callback: function(result){
        if(result){
            scheduler.message("You clicked Ok");
        }else{
            scheduler.message("You clicked Cancel");
        }
    }
});
~~~

## 模态框 (#modal)

![modalbox](/img/modalbox.png)

模态框具有以下特点:

- *text* 支持任意 *HTML* 内容
- 支持通过 *buttons* 数组定义多个按钮，每个按钮有文本标签
- *callback* 函数接收被点击按钮的索引作为参数

~~~js
scheduler.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});
~~~

### 配置模态框按钮

配置模态框按钮有两种主要方式:

- 简写形式:

~~~js
scheduler.modalbox({
    // 其他设置
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                // Save
                break;
            case "1":
                // Delete
                break;
            case "2":
                // Cancel
                break;
        }    
    }
});
~~~

在此形式下，回调函数接收被点击按钮的字符串索引（"0"、"1"、"2" ...）。每个按钮会基于小写标签生成 CSS 类，例如:*scheduler_**save**_button*、*scheduler_**delete**_button*、*scheduler_**cancel**_button*。

这些类可用于按钮样式自定义:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

如果多个弹窗使用相同按钮名但需不同样式，可使用 **type** 属性:

~~~js
scheduler.modalbox({
    // 其他设置
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type** 的值会加上 "scheduler_" 前缀，并作为类名添加到弹窗元素上:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- 完整形式:

你可以通过详细配置，明确指定按钮标签、CSS 类和回调值:

~~~js
scheduler.modalbox({
    // 其他设置
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                // Save
                break;
            case "cancel":
                // Cancel
                break;
            case "delete":
                // Delete
                break;
        }
    }
});
~~~

仅 **label** 参数为必需；**css** 和 **value** 可选。若未指定，CSS 类会根据小写标签自动生成，回调值为按钮索引。

**css** 类会加上 "scheduler_" 前缀，并应用到按钮元素:

~~~js
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## 隐藏模态消息框

如需手动关闭模态消息框，请使用 **scheduler.modalbox.hide()** 方法，并传入模态框的容器元素:

~~~js
var box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

对于 **alert** 和 **confirm** 框，同样使用 **scheduler.modalbox.hide()** 方法:

~~~js
var box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~

## 样式自定义

你可以通过定义 CSS 样式自定义任意消息框的外观。通常通过 *type* 参数指定 CSS 类:创建 CSS 类并将其名称赋值给 *type*。

关于 'type' 参数，请注意以下事项:

- 若要自定义 alert 和 confirm 框，请使用与窗口相关的方法初始化。
- 若要自定义消息框，请使用通用方法初始化。
- CSS 类名应以 'scheduler-' 前缀开头。
- 为确保样式生效，请使用如 **.scheduler-some div** 的选择器定位 scheduler 消息内部元素。

示例:

~~~js
<style type="text/css">
.scheduler-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>

scheduler.message({ type:"myCss", text:"some text" });
~~~

## 模态窗口与键盘交互

模态框的键盘行为由 **scheduler.message.keyboard** 属性控制，默认值为 *true*。

启用时，模态框会阻止页面上的大多数键盘事件。仅以下按键可用:

- "空格键"和"回车键" -- 在模态框中触发 *true* 结果
- "Esc" -- 触发 *false* 结果

将 **scheduler.message.keyboard** 设为 *false* 可关闭此阻止，允许完整键盘输入，适用于在模态框中输入数据:

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

这样即可在模态窗口中正常使用键盘。
