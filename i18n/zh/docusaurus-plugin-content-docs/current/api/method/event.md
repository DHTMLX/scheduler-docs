---
sidebar_label: "event"
title: "event method"
description: "在HTML元素上设置事件处理器"
---

# event

### Description

@short: 在HTML元素上设置事件处理器

@signature: event: (node: HTMLElement | string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement | string* - HTML元素或其id
- `event` - (required) *string* - HTML事件的名称（不带'on'前缀）
- `handler` - (required) *function* - 处理事件的函数
- `master` - (optional) *object* - handler内部this所指向的对象

### Returns
- ` id` - (string) - 事件处理器的id（可用于<b>eventRemove()</b>方法）

### Example

~~~jsx
// 为'click'事件附加处理器
scheduler.event("divId", "click", function(e){
    //e - 原生event对象
    do_something();
});
~~~

### Details

通过**event**添加的所有事件监听器将在调用[destructor](api/method/destructor.md)时自动移除。

### Related API
- [eventRemove](api/method/eventremove.md)

### Change log
- 版本4.4新增
