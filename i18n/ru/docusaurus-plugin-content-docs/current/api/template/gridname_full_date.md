---
sidebar_label: "GRID_full_date"
title: "GRID_full_date template"
description: "определяет, как отображаются даты в колонках с id='date'"
---

# GRID_full_date

### Description

@short: Определяет, как отображаются даты в колонках с id='date'

@signature: GRID_full_date: (start: Date, end: Date, ev: object) =\> string;

### Parameters

- `start` - (required) *Date* - начальная дата события  
- `end` - (required) *Date* - конечная дата события
- `ev` - (required) *object* - подробности события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.grid_full_date = function(start,end,event){
    if (scheduler.isOneDayEvent(event))
        return scheduler.templates.grid_single_date(start);
    else
        return scheduler.templates.day_date(start)+" &ndash; "
           +scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Этот template зависит от включенного плагина [grid_view](guides/extensions-list.md#gridview). 
:::

### Related API
- [GRID_single_date](api/template/gridname_single_date.md)

### Related Guides
- [Шаблоны представления грида](views/grid-view-templates.md)
