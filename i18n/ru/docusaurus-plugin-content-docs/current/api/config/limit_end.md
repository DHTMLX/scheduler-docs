---
sidebar_label: limit_end
title: "limit_end config"
description: "устанавливает предел конца допустимого диапазона дат"
---

# limit_end

### Description

@short: Устанавливает предел конца допустимого диапазона дат

@signature: limit_end: Date

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

Настройки **limit_start/limit_end** ограничивают диапазон, в пределах которого можно создавать новые события.
Кроме того, вы можете контролировать видимость событий за пределами этого диапазона с помощью свойства [limit_view](api/config/limit_view.md):

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)