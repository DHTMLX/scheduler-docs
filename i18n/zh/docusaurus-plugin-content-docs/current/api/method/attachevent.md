---
sidebar_label: attachEvent
title: "attachEvent 方法"
description: "将处理程序附加到 dhtmlxScheduler 的内部事件"
---

# attachEvent

### Description

@short: 将处理程序附加到 dhtmlxScheduler 的内部事件

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - 事件名称，忽略大小写
- `handler` - (required) *function* - 处理函数
- `settings` - (optional) *object* - 可选，一个用于事件处理程序的 [settings 对象](#properties-of-settings-object)

### Returns
- `event` - (string) - 已附加事件处理程序的 id

### Example

~~~jsx
scheduler.attachEvent("onEventSave", (id, ev) => {
    if (!ev.text) {
        alert("文本不能为空");
        return false;
    }
    return true;
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

你可以向同一个事件附加多个处理程序，所有处理程序都会被执行。  
如果某些处理程序返回 `false`，相关操作将被阻止。  
事件处理程序按照它们被附加的顺序进行处理。

所有通过 [`event()`](api/method/event.md) 绑定的事件监听器将在调用 [`destructor()`](api/method/destructor.md) 时自动分离。

## Settings 对象的属性

Settings 对象可以包含两个属性：

1\. `id` - (*string*) 事件处理程序的 id

例如，您可以很容易地从指定事件分离一个处理程序：

~~~js {3}
scheduler.attachEvent("onClick", () => {
    console.log("event click");
}, { id: "my-click" });
// after a while:
scheduler.detachEvent("my-click");
~~~

2\. `once` - (*boolean*) 定义事件是否仅执行一次

如果希望捕获事件的第一次触发，请将该属性设置为 *true*，如下所示：

~~~js {4}
scheduler.attachEvent("onClick", () => {
    console.log("capture next event click");
    return true;
}, { once: true });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)