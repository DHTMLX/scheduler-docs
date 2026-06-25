---
sidebar_label: "now_date"
title: "now_date config"
description: "设置 Limit 扩展中当前时间标记的日期（通过 - mark_now 配置激活）"
---

# now_date

### Description

@short: 设置 Limit 扩展中当前时间标记的日期（通过 - mark_now 配置激活）

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2027, 7, 5);
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

### Details

:::note
 该属性仅在启用 [limit](guides/extensions-list.md#limit) 插件时有效。 
:::

此选项专门用于 [Limit 扩展](guides/limits.md)。

### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
