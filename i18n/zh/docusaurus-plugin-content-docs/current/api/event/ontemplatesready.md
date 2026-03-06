---
sidebar_label: "onTemplatesReady"
title: "onTemplatesReady event"
description: "当调度器模板初始化完成时触发"
---

# onTemplatesReady

### Description

@short: 当调度器模板初始化完成时触发

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    //在此处放置自定义逻辑
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

该事件表示调度器的模板已完全准备就绪。

建议将任何自定义视图创建代码放在 **onTemplatesReady** 事件处理程序中。这样可以确保自定义视图的模板在调度器初始化之前就已准备好，从而使自定义视图能够正确显示在页面上。
