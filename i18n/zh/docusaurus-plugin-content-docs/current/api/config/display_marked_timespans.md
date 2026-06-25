---
sidebar_label: "display_marked_timespans"
title: "display_marked_timespans config"
description: "控制调度器中标记（阻止）的时间段是否高亮显示"
---

# display_marked_timespans

### Description

@short: 控制调度器中标记（阻止）的时间段是否高亮显示

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

### Details

此属性自版本 3.5 起可用。

:::note
 该属性需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

当设置为 *false* 时，时间段仍将被阻止，但显示为普通调度器单元格，不会有任何特殊高亮。

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
