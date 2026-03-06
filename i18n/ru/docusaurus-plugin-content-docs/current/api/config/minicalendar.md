---
sidebar_label: "minicalendar"
title: "minicalendar config"
description: "определяет объект миникалендаря"
---

# minicalendar

### Description

@short: Определяет объект миникалендаря

@signature: minicalendar: any

### Example

~~~jsx
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** \{ mark_events: true \}

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note
 Это свойство требует включения плагина [minical](guides/extensions-list.md#minicalendardatepicker). 
::: 

Объект minicalendar содержит одно свойство:

- **mark_events** - (*array*) определяет, будут ли события выделяться внутри миникалендаря

<br>

![minicalendar_property](/img/minicalendar_property.png)
