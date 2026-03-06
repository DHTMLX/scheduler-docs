---
sidebar_label: "map_date"
title: "map_date template"
description: "устанавливает дату, отображаемую в заголовке представления"
---

# map_date

### Description

@short: Устанавливает дату, отображаемую в заголовке представления

@signature: map_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата представления
- `end` - (required) *Date* - конечная дата представления

### Returns
- ` text` - (string) - html-текст для отображения в scheduler

### Example

~~~jsx
//default definition
scheduler.templates.map_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Этот шаблон работает только если включен плагин [map_view](guides/extensions-list.md#mapview). 
:::

### Related Guides
- [Шаблоны Map View](views/map-view-templates.md)
