---
sidebar_label: "marker_date"
title: "marker_date template"
description: "устанавливает дату для события, отображаемого в всплывающей подсказке (tooltip) маркера на Google Maps"
---

# marker_date
:::warning
Эта функицональность устарела
::: 
### Description

@short: Устанавливает дату для события, отображаемого в всплывающей подсказке (tooltip) маркера на Google Maps

### Parameters

- `start` - (required) *Date* - начальная дата события   
- `end` - (required) *Date* - конечная дата события
- `event` - (required) *object* - сам объект события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.marker_date = function(date){
    return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};
~~~

**Доступные представления:** [Map view](views/map.md)

### Details

:::note
 Этот шаблон работает только если включён плагин [map_view](guides/extensions-list.md#mapview). 
:::

### Related Guides
- [Шаблоны Map View](views/map-view-templates.md)
