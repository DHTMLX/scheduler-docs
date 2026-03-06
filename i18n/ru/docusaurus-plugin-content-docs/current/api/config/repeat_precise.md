---
sidebar_label: "repeat_precise"
title: "repeat_precise config"
description: "прекращает включать прошедшие дни в события с повторением 'weekly'"
---

# repeat_precise

### Description

@short: Прекращает включать прошедшие дни в события с повторением 'weekly'

@signature: repeat_precise: boolean

### Example

~~~jsx
scheduler.config.repeat_precise = true;
~~~

**Default value:** false

### Details

:::note
 Свойство требует включения расширения [recurring](guides/extensions-list.md#recurring). 
:::

По умолчанию, когда задано повторение 'weekly', scheduler добавляет текущую неделю к повторению, 
независимо от того, создано ли событие после, между или до указанных дней.<br>

Например, если событие создано в четверг и настроено на повторение по понедельникам и средам, 
то событие будет включать понедельник и среду текущей недели, даже если эти дни уже прошли.

Когда опция **repeat_precise** установлена в *true*, дата начала повторяющегося события 
будет датой первого фактического повторения, то есть в нашем примере это будет понедельник следующей недели.

### Related Guides
- [Повторяющиеся события](guides/recurring-events.md)
