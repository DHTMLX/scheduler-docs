---
sidebar_label: check_limits
title: "конфигурация check_limits"
description: "активирует/деактивирует проверку лимитов"
---

# check_limits

### Description

@short: Активирует/деактивирует проверку лимитов

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2013,7,6),"week");
~~~

**Значение по умолчанию:** true

### Details

:::note
 Свойство требует активации плагина [limit](guides/extensions-list.md#limit).
:::

Параметр доступен начиная с версии 3.5.

Отключение этой настройки может быть полезно, если ограничения не заданы и требуется только подсветка или отметка текущего времени, так как это может улучшить производительность. Однако если ограничения определены, отключение этой опции также выключит все функции «блокировки».

### Related Guides
- [Блокирование и пометка дат](guides/limits.md)