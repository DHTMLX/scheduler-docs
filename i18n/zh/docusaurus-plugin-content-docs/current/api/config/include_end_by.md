---
sidebar_label: "include_end_by"
title: "include_end_by config"
description: "设置'End by'字段中输入的日期是作为排他日期还是包含日期处理"
---

# include_end_by
:::warning 
此属性仅在使用旧版重复事件扩展时有效。
:::
### Description

@short: 设置"End by"字段中输入的日期是作为排他日期还是包含日期处理

@signature: include_end_by: boolean

### Example

~~~jsx
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** false

### Details

:::note
 此属性需要启用[recurring](guides/extensions-list.md#recurring) 扩展。 
:::

默认情况下，"End by"字段中的日期被视为排他日期。

例如，如果用户在"End by"字段中设置了"01.15.2027":

- 当 <code>include_end_by = false</code>（默认）时，重复系列结束于 01.14.2027。
- 当 <code>include_end_by = true</code> 时，重复系列结束于 01.15.2027。

### 数据库如何保存日期？

调度器中选择的所有日期都包含小时和分钟部分，因此在任何日期选择器中选择的日期如 *15.11.2027* 会被解释为 *15.11.2027 00:00*。

这会影响在重复事件表单中选择"End by"时系列的持续时间。

例如，用户在"End by"字段中输入 *15.11.2027*:

- 当 <code>include_end_by = false</code>（默认）时，系列结束日期保存为 *15.11.2027 00:00*，意味着最后可能的事件发生时间是 *14.11.2027 23:59*，因此选定日期当天不会发生事件；
- 当 <code>include_end_by = true</code> 时，系列结束日期保存为 *16.11.2027 00:00*（选定日期之后的午夜），将选定日期包含在系列中，允许最后一个事件发生时间为 *15.11.2027 23:59*。

### Related API
- [repeat_date](api/config/repeat_date.md)

### Related Guides
- [반복 이벤트](guides/recurring-events.md)
