---
sidebar_label: "recurring_overflow_instances"
title: "recurring_overflow_instances config"
description: "控制跨月重复事件的处理方式"
---

# recurring_overflow_instances
:::warning 
此属性仅在使用旧版重复事件扩展时有效。
:::
### Description

@short: 控制跨月重复事件的处理方式

@signature: recurring_overflow_instances: string

### Example

~~~jsx
scheduler.config.recurring_overflow_instances = "lastDay";
~~~

**Default value:** undefined

### Details

:::note
 此属性需要激活[recurring](guides/extensions-list.md#recurring)扩展。 
:::

以每月30日安排的事件为例，考虑在二月份根据不同设置的表现:

- **"skip"** - 不存在的日期事件将被跳过。*因此，该事件在二月份不会发生。* 
- **"lastDay"** - 不存在的日期事件将被移至当月的最后一天。*此时，事件发生在2月28日。*
- **"none"** - 不存在的日期事件将被移至下个月的第一天。*此时，事件发生在3月1日。*

如果未指定选项，默认行为为 "skip"。

### Change log
- 在v5.3.11中添加
