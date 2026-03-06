---
sidebar_label: "drag_out"
title: "drag_out config"
description: "防止事件从此scheduler拖动到其他scheduler"
---

# drag_out

### Description

@short: 防止事件从此scheduler拖动到其他scheduler

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false; // 禁用从此scheduler向其他scheduler拖动事件
scheduler.init('scheduler_here', new Date(2009,05,30), "week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2', new Date(2009,05,30), "week");
~~~

**Default value:** true

### Details

:::note

此功能仅在Scheduler PRO（自2021年10月6日起为商业版）、Enterprise和Ultimate许可中可用。
 
:::

:::note
 此功能需要启用[outerdrag](guides/extensions-list.md#outerdrag) 插件。 
:::

### Related API
- [drag_in](api/config/drag_in.md)

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
- [페이지에서 여러 개의 Scheduler 생성하기](guides/multiple-per-page.md)
