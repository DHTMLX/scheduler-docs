---
title: "弹出消息与模态框"
sidebar_label: "弹出消息与模态框"
---

# 弹出消息和模态框

消息在 Scheduler 中用于通知用户发生错误、确认或拒绝某个操作、从若干选项中进行选择等。
Scheduler 消息基于 [the fork of the dhtmlxMessage repository](https://github.com/DHTMLX/message) 的一个分支。
因此，dhtmlxMessage 的全部功能对 dhtmlxScheduler 的消息同样适用。

消息主要有两种类型：[简单弹出消息框](#basic-popup-message) 和 带按钮的[模态消息框](#modal-message-boxes)，二者会阻塞应用的运行。

模态消息框可以属于三种类型之一：

- [警告消息框](#alert-message-box-alert)
- [确认消息框](#confirm-message-box-confirm)
- [Modalbox](#modal-box-modal)


## 基本弹出消息

要创建一个基本的模态消息框，请使用 [scheduler.message](api/method/message.md) 方法。该方法的必填参数是消息文本：

~~~js
scheduler.message("The event is updated");
~~~

消息框有三种类型：

- 默认消息框（**type:"info"**）

![default_message](/img/default_message.png)

- 错误消息框（**type:"error"**）

![error_message](/img/error_message.png)

- 警告消息框（**type:"warning"**）

![warning_message](/img/warning_message.png)

要创建相应的消息框，需要通过 *type* 属性设置相应的值：

~~~js
// 创建一个错误消息框
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[不同类型的弹出框和模态框](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


要应用不同的样式到消息框，需要通过 type 参数指定一个 CSS 类，如此处所述 [here](#styling)。

### 消息框定位

默认情况下，弹出消息框显示在窗口的右上角。与会覆盖父应用并阻塞其工作的[模态消息框](#modal-message-boxes)不同，弹出消息框不会阻塞工作流。你可以通过设置 **scheduler.message.position** 属性来改变消息框的位置：

~~~js
scheduler.message.position = 'bottom';
~~~

消息位置有四个可能的取值：

- **top** - 在窗口的右上角显示消息框，默认设置
- **bottom** - 在窗口的右下角显示消息框
- **left** - 在窗口左侧显示，在 Scheduler 下方
- **right** - 在窗口右侧显示，在 Scheduler 下方

### 过期间隔

可以通过 *expire* 参数自定义消息框的过期时间。它是在消息结束一定时间后消息框消失的时间段，单位为毫秒。
默认情况下，过期间隔为 4000 毫秒。

你也可以修改该值，或通过将 expire 参数设为 "-1" 来完全取消过期时间。在这种情况下，消息框只会在鼠标点击时消失。

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### 使用 API 隐藏消息框

如果你想手动隐藏指定的消息框，而不是等待它自动隐藏，可以使用 **scheduler.message.hide(boxId)** 方法。它只接收一个参数：

- **boxId** - 构造消息框时指定的框的 id

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~


## 模态消息框

模态消息框会阻塞父应用的工作，直到执行了所需操作（通常是点击按钮）。它在按钮点击后关闭，若有回调函数则会执行。

模态消息框共有三种类型：

- [ Alert Message Box](#alert-message-box-alert) - 带一个按钮的提醒框；
- [ Confirm Message Box](#confirm-message-box-confirm) - 带两个按钮的确认框（用于确认或取消）； 
- [ Modalbox](#modal-box-modal) - 带无限数量按钮的模态消息框。 

框的一些通用属性包括：

- **id** - 消息框的 id；
- **title** - 标题文本；
- **type** - 消息框的类型（警告或错误）；
- **text** - 消息框主体文本； 
- **ok** - “OK” 按钮的文本；
- **cancel** - “Cancel” 按钮的文本（用于确认框）；
- **callback** - 按钮点击时调用的函数。参数为 *true* 或 *false*，取决于所点击的按钮；
- **position** - 目前仅支持一个值 - "top"，其他值将对齐为居中；
- **width** - 模态框的宽度（以 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 值设置，例如 "100px", "50%"）；
- **height** - 模态框的高度（同样以 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 值设置，例如 "100px", "50%"）。

## Alert Message Box (#alert) {#alert-message-box-alert}

![alert](/img/alert.png)

警报消息框包含一个“OK”按钮。要设置“OK”按钮的文本，请使用 *ok* 参数，其值为文本：

- 简短形式（仅包含消息文本 - 参数 'text' 的隐式使用，其他参数采用默认值）：

~~~js
scheduler.alert("Text");
~~~

- 完整形式（包含若干可用参数，未指定的参数采用默认值）

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~


## Confirm Message Box (#confirm) {#confirm-message-box-confirm}

![confirm](/img/confirm.png)

确认消息框有两个按钮：“OK”和“Cancel”。按钮文本在相应的属性中定义。

- 简短形式

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


## Modal Box (#modal) {#modal-box-modal}

![modalbox](/img/modalbox.png)

模态框具备一些特殊特性：

- 其 *text* 可以包含任意 *HTML* 内容；
- 其中 *buttons* 数组可以指定很多按钮，数组内包含按钮的文本值；
- *callback* 函数将参数设为所选按钮的 *index*。

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

定义模态框按钮的配置有两种主要方式：

- 简短形式：

~~~js
scheduler.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~  

回调函数的结果将等于从按钮数组中按下的按钮的字符串化索引值（"0", "1", "2",...）。
每个按钮将从其标签转换为小写来获得一个 CSS 类，例如 *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button*。

这些类可用于样式化按钮：

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

如果同一个名称的按钮被多个弹出框使用且需要不同的样式，可以使用 **type** 配置：

~~~js
scheduler.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type** 将会以 "scheduler_" 字符串为前缀并添加到弹出元素的类名中：

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- 完整形式：

可以通过更长的配置形式显式定义按钮的 CSS 类和回调值：

~~~js
scheduler.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

其中 **label** 参数为必填项，而 **css** 和 **value** 选项可以省略。若缺少参数，将按按钮配置简短形式计算：CSS 将从小写化的按钮标签继承，按钮索引将用作值。

**css** 将以 "scheduler_" 字符串为前缀并添加到按钮元素的类名中：

~~~css
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## 隐藏模态消息框

要手动隐藏模态消息框，而不是等待其自动隐藏，可以使用 **scheduler.modalbox.hide()** 方法。参数为模态框的 div 容器：

~~~js
const box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~  

对于 **alert** 和 **confirm** 模态框，同样需要使用 **scheduler.modalbox.hide()** 方法：

~~~js
const box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~


## 样式

对于任意类型的消息框，你都可以定义自定义样式以实现所需的外观。
通常，通过 *type* 参数指定相应的 CSS 类：你定义一个 CSS 类并将该参数设置为它的名称。

在设置 'type' 参数时需要牢记一些规则：

- 要为警告和确认框设置 CSS 类，必须以“窗口相关”的方式初始化此类框。
- 要为消息框设置 CSS 类，必须以“通用”方式初始化此类框。
- CSS 类名应以 'scheduler-' 前缀开头。
- 为了正确应用样式，需使用该类名作为 .scheduler-some div 的选择器，表示该样式适用于调度程序消息内部的元素。

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

模态框的键盘功能由 **scheduler.message.keyboard** 属性控制。初始时，它被设置为 true。

默认情况下，模态框会阻止页面的键盘事件。可使用的按键只有：

- "space" 和 "enter" - 将模态框的结果设为 true；
- "escape" - 将模态框的结果设为 false。

通过将 **keyboard** 属性设置为 false，你将启用键盘事件（并禁用上述按键）：

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

这使得你可以在模态框内对输入框等控件进行完整的键盘输入。