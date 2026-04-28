---
sidebar_label: occurrence_timestamp_in_utc
title: "occurrence_timestamp_in_utc config"
description: "позволяет работать с повторяющимися событиями независимо от часовых поясов"
---

# occurrence_timestamp_in_utc

### Description

@short: Позволяет работать с повторяющимися событиями независимо от часовых поясов

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Значение по умолчанию:** false

### Details

:::note
 Свойство требует включения расширения [recurring](guides/extensions-list.md#recurring). 
:::

:::note

Внимание! Параметр предназначен для только что созданных планировщиков без существующих повторяющихся событий.
Применение к планировщику, у которого уже есть повторяющиеся события, приведёт к их сбою.
 
:::
- Если параметр включён, временные метки событий сохраняются как UNIX-время.
- Опция доступна начиная с версии 3.5.

### Related Guides
- [Повторяющиеся события](guides/recurring-events.md)