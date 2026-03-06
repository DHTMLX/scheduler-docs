---
sidebar_label: "GRID_single_date"
title: "GRID_single_date template"
description: "определяет, как отображаются даты в колонках с id='start_date' или id='end_date'"
---

# GRID_single_date

### Description

@short: Определяет, как отображаются даты в колонках с id='start_date' или id='end_date'

@signature: GRID_single_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст, используемый для рендеринга scheduler

### Example

~~~jsx
scheduler.templates.grid_single_date = function(date){
    return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Этот шаблон работает при включенном плагине [grid_view](guides/extensions-list.md#gridview). 
:::

### Related API
- [GRID_full_date](api/template/gridname_full_date.md)

### Related Guides
- [Шаблоны представления грида](views/grid-view-templates.md)
