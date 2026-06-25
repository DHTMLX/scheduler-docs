---
sidebar_label: "GRID_date"
title: "GRID_date template"
description: "устанавливает дату, отображаемую в заголовке представления"
---

# GRID_date

### Description

@short: Устанавливает дату, отображаемую в заголовке представления

@signature: GRID_date: (start: Date, end: Date) =\> string;

### Parameters

- `start` - (required) *Date* - начальная дата представления
- `end` - (required) *Date* - конечная дата представления

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
// определено по умолчанию
scheduler.templates.grid_date = function(start, end){
    return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};
~~~

**Доступные представления:** [Grid view](views/grid.md)

### Details

:::note
 Этот шаблон работает только при включенном плагине [grid_view](guides/extensions-list.md#gridview). 
:::

### Related Guides
- [Шаблоны представления грида](views/grid-view-templates.md)
