---
title: "多个调度器之间的拖放"
sidebar_label: "多个调度器之间的拖放"
---

# 在多个调度器之间拖放

:::info
该功能仅在 Commercial（自 2021 年 10 月 6 日起）、Enterprise 及 Ultimate 许可证下可用。
:::

如果在同一页面显示 [多个调度器](guides/multiple-per-page.md)，你可以启用它们之间的拖放操作，使用户能够在一个调度器和另一个调度器之间拖动事件，反之亦然。

要为调度器启用拖放支持，请在页面中包含 "**drag_between**" 扩展:

[Enabling drag-and-drop support for several schedulers](Enabling drag-and-drop support for several schedulers)

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
</script>
~~~

示例 **"samples/20_multiple/06_drag_between_layout.html"** 由 [Scheduler PRO 包](https://dhtmlx.com/docs/products/dhtmlxScheduler/) 提供。

### Denying dragging events to\/from one of schedulers
要拒绝从某个调度器拖出事件，请将 [drag_out](api/config/drag_out.md) 属性设置为 *false*：

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2027, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

要拒绝将事件拖入某个调度器，请将 [drag_in](api/config/drag_in.md) 属性设置为 *false*：

~~~js
scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

示例 **"samples/20_multiple/06_drag_between_layout.html"** 由 [Scheduler PRO 包](https://dhtmlx.com/docs/products/dhtmlxScheduler/) 提供。

### Drag events

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - 在拖拽的事件被移出调度器之前触发
- [onEventDragOut](api/event/oneventdragout.md) - 当拖拽的事件被移出调度器时触发
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - 在拖拽的事件被移动到调度器上方之前触发
- [onEventDragIn](api/event/oneventdragin.md) - 当拖拽的事件被移动到调度器上方时触发
- [onEventDropOut](api/event/oneventdropout.md) - 当拖拽的事件被放置在调度器区域之外时触发