---
sidebar_label: "limit_end"
title: "limit_end config"
description: "определяет конечную границу допустимого диапазона дат"
---

# limit_end

### Description

@short: Определяет конечную границу допустимого диапазона дат

@signature: limit_end: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
...
scheduler.init('scheduler_here',new Date(2018,5,30),"week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 Для использования этого свойства необходимо включить плагин [limit](guides/extensions-list.md#limit). 
:::

Настройки **limit_start/limit_end** ограничивают диапазон, в пределах которого можно создавать новые события.
Кроме того, вы можете контролировать видимость событий за пределами этого диапазона с помощью свойства [limit_view](api/config/limit_view.md):

~~~js
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
