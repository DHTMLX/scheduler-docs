---
sidebar_label: "onContextMenu"
title: "onContextMenu event"
description: "当用户在调度器内右键点击以打开上下文菜单时触发"
---

# onContextMenu

### Description

@short: 当用户在调度器内右键点击以打开上下文菜单时触发

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 id
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    // 可以在这里添加自定义逻辑
});
~~~

### Related samples
- [Integration with dhtmlxMenu](https://docs.dhtmlx.com/scheduler/samples/10_integration/01_dhtmlxmenu.html)

### Details

当用户右键点击某个事件时，处理函数会接收到该事件的 id；如果不是点击事件，则接收到 null。
