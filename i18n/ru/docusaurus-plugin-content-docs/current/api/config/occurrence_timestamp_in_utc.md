---
sidebar_label: "occurrence_timestamp_in_utc"
title: "occurrence_timestamp_in_utc config"
description: "позволяет работать с повторяющимися событиями без необходимости учитывать часовые пояса"
---

# occurrence_timestamp_in_utc

### Description

@short: Позволяет работать с повторяющимися событиями без необходимости учитывать часовые пояса

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Details

:::note
 Это свойство требует активации расширения [recurring](guides/extensions-list.md#recurring). 
:::

:::note

Внимание! Эта опция предназначена для schedulers, которые только начинают работать и в которых ещё нет повторяющихся событий.
Включение этой опции в schedulers с уже существующими повторяющимися событиями может вызвать проблемы.
 
:::
- При включении временные метки событий сохраняются в формате UNIX time.
- Эта опция доступна начиная с версии 3.5.

### Related Guides
- [Повторяющиеся события](guides/recurring-events.md)
