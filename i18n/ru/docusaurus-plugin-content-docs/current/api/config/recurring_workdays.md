---
sidebar_label: "recurring_workdays"
title: "recurring_workdays config"
description: "определяет, какие дни считаются рабочими для повторяющихся событий при выборе опции 'Every workday' в lightbox."
---

# recurring_workdays

### Description

@short: Определяет, какие дни считаются рабочими для повторяющихся событий при выборе опции "Every workday" в lightbox.

@signature: recurring_workdays: any[]

### Example

~~~jsx
//устанавливает рабочие дни с вторника по пятницу
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Default value:** [1, 2, 3, 4, 5]

### Details

:::note
 Для использования этой настройки необходимо включить расширение [recurring](guides/extensions-list.md#recurring). 
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)
