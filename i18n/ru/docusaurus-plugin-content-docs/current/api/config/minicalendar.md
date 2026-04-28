---
sidebar_label: minicalendar
title: "конфигурация minicalendar"
description: "задает объект мини-календаря"
---

# minicalendar

### Описание

@short: Задает объект мини-календаря

@signature: minicalendar: any

### Пример

~~~jsx
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Значение по умолчанию:** \{ mark_events: true \}

### Связанные образцы
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Подробности

:::note
 Свойство требует активированного плагина [minical](guides/extensions-list.md#mini-calendar-date-picker) для работы. 
::: 

Объект minicalendar имеет 1 свойство:

- **mark_events** - (*массив*) задаёт, будут ли события выделяться в мини-календаре

![minicalendar_property](/img/minicalendar_property.png)