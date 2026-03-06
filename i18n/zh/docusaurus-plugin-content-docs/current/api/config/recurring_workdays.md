---
sidebar_label: "recurring_workdays"
title: "recurring_workdays config"
description: "定义在 lightbox 中选择 'Every workday' 选项时，哪些天被视为工作日的数组。"
---

# recurring_workdays

### Description

@short: 定义在 lightbox 中选择 "Every workday" 选项时，哪些天被视为工作日的数组。

@signature: recurring_workdays: any[]

### Example

~~~jsx
// 设置工作日为周二到周五
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Default value:** [1, 2, 3, 4, 5]

### Details

:::note
 该设置需要启用 [recurring](guides/extensions-list.md#recurring) 扩展。 
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)
