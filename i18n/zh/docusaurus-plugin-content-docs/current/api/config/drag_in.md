---
sidebar_label: "drag_in"
title: "drag_in config"
description: "限制拖动事件，使其只能在发起拖动的调度器内移动，防止在不同调度器之间转移。"
---

# drag_in

### Description

@short: 限制拖动事件，使其只能在发起拖动的调度器内移动，防止在不同调度器之间转移。

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,05,30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // 禁止事件拖入此调度器
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027,05,30),"week");
~~~

**Default value:** true

### Details

:::note

此功能仅适用于 Scheduler PRO（自2021年10月6日起商业版）、Enterprise 和 Ultimate 许可证。
 
:::

:::note
 该属性需要启用 [outerdrag](guides/extensions-list.md#outerdrag) 插件才能生效。 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
- [페이지에서 여러 개의 Scheduler 생성하기](guides/multiple-per-page.md)
