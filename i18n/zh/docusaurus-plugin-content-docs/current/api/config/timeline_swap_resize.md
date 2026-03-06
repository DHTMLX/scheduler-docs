---
sidebar_label: "timeline_swap_resize"
title: "timeline_swap_resize config"
description: "允许在调整大小时，如果结束日期被拖动到开始日期之前，事件的结束日期与开始日期互换"
---

# timeline_swap_resize
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 允许在调整大小时，如果结束日期被拖动到开始日期之前，事件的结束日期与开始日期互换

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Default value:** true

### Details

:::note
 此属性需要启用[timeline](guides/extensions-list.md#timeline) 插件。 
:::

当设置为 *false* 时，调整事件大小时，不能通过拖放将结束日期拖到开始日期之前（或将开始日期拖到结束日期之前）。

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md#timeline)

### Change log
- 4.4 版本新增
