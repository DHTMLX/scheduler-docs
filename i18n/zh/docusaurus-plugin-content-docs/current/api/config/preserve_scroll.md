---
sidebar_label: "preserve_scroll"
title: "preserve_scroll config"
description: "在同一视图中切换日期时，停止保持当前的滚动位置"
---

# preserve_scroll

### Description

@short: 在同一视图中切换日期时，停止保持当前的滚动位置

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- 该选项自版本 3.0 起可用。
- 当用户通过导航面板在视图内切换日期时生效 <br> 使用导航面板 -> ![navigation_panel](/img/navigation_panel.png)。
