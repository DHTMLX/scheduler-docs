---
sidebar_label: "map_time"
title: "map_time template"
description: "задаёт дату, отображаемую в первом столбце представления"
---

# map_time

### Description

@short: Задаёт дату, отображаемую в первом столбце представления

@signature: map_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.map_time = function(start,end,ev){
    if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
        return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};
~~~

**Доступные представления:** [Map view](views/map.md)

### Details

:::note
 Шаблон требует включения плагина [map_view](guides/extensions-list.md#mapview). 
:::

### Related Guides
- [Шаблоны Map View](views/map-view-templates.md)
