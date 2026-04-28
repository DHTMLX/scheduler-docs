---
sidebar_label: limit_start
title: "limit_start config"
description: "задает начальный предел допустимого диапазона дат"
---

# limit_start

### Description

@short: Устанавливает начальный предел допустимого диапазона дат

@signature: limit_start: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Значение по умолчанию:** null

### Related samples
- [Ограничение дат для создания событий](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 Свойство требует активации плагина [limit](guides/extensions-list.md#limit). 
:::

Настройки **limit_start** и **limit_end** ограничивают диапазон дат, в котором можно создавать новые события. Кроме того, можно запретить просмотр событий за пределами этого допустимого диапазона, включив свойство `limit_view`:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_end](api/config/limit_end.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Блокировка и пометка дат](guides/limits.md)