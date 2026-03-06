---
sidebar_label: "attachEvent"
title: "attachEvent method"
description: "为 dhtmlxScheduler 的内部事件绑定处理函数"
---

# attachEvent

### Description

@short: 为 dhtmlxScheduler 的内部事件绑定处理函数

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - 事件名称，大小写不敏感  
- `handler` - (required) *function* - 处理该事件的函数  
- `settings` - (optional) *object* - 可选，事件处理函数的[配置对象](#properties-of-settings-object)

### Returns
- `event` - (string) - id 绑定事件处理函数的标识符

### Example

~~~jsx
scheduler.attachEvent("onEventSave", function(id, ev) {
    if (!ev.text) {
        alert("文本不能为空");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

同一个事件可以绑定多个处理函数，所有处理函数都会被执行。<br> 如果任何一个处理函数返回 *false*，则会阻止关联操作的执行。<br> 
处理函数按照绑定的先后顺序依次调用。

通过 [event](api/method/event.md) 添加的所有事件监听器，在调用 [destructor](api/method/destructor.md) 时会被自动移除。

## 配置对象的属性 {#properties-of-settings-object}

配置对象可包含以下两个属性:

1\. **id** - (*string*) 事件处理函数的唯一标识符 

这便于从事件中移除特定的处理函数:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("event click");
}, {id: "my-click"}); /*!*/
... //稍后：
gantt.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) 指示事件处理函数是否只执行一次 

设置为 *true* 时，处理函数仅响应事件的首次触发，示例如下:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("capture next event click");
    return true;
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
