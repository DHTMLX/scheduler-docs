--- 
sidebar_label: recurring_workdays
title: "Конфигурация recurring_workdays"
description: "указывается рабочие дни, которые будут влиять на повторяющееся событие, когда пользователь выбирает опцию ''Every workday' в окне lightbox"
---

# recurring_workdays

### Description

@short: Указывает рабочие дни, которые будут влиять на повторяющееся событие, когда пользователь выбирает опцию ""Every workday" в окне lightbox

@signature: recurring_workdays: any[]

### Example

~~~jsx
//устанавливает рабочие дни с вторника по пятницу
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Значение по умолчанию:** [1, 2, 3, 4, 5]

### Details

:::note
 Свойство требует включения расширения [recurring](guides/extensions-list.md#recurring).
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)