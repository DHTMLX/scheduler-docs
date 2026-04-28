---
sidebar_label: "mark_now"
title: "mark_now config"
description: "打开或关闭当前时间的标记器"
---

# mark_now

### Description

@short: 打开或关闭当前时间的标记器

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 此功能依赖于已启用的 [limit](guides/extensions-list.md#limit) 插件。 
:::

:::note
 对于 Timeline 视图，请确保页面上先加载了 [limit](guides/extensions-list.md#limit) 扩展，再加载 [Timeline](guides/extensions-list.md#timeline) 扩展。 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
