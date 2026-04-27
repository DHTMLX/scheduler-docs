---
sidebar_label: "GRID_field"
title: "GRID_field template"
description: "определяет текст, отображаемый в колонках"
---

# GRID_field

### Description

@short: Определяет текст, отображаемый в колонках

@signature: GRID_field: (field_name: string, event: object) =\> string;

### Parameters

- `field_name` - (required) *string* - идентификатор колонки  
- `event` - (required) *object* - данные события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.grid_field = function(field_name, event){
    return event[field_name];
};
~~~

**Доступные представления:** [Grid view](views/grid.md)

### Details

:::note
 Этот шаблон работает только если включен плагин [grid_view](guides/extensions-list.md#gridview). 
:::

Учтите, что этот шаблон не применяется к колонкам с id='date', id='start_date' или id='end_date'. Для этих колонок используются 
шаблоны [GRID_full_date](api/template/gridname_full_date.md) и [GRID_single_date](api/template/gridname_single_date.md).

### Related Guides
- [Шаблоны представления грида](views/grid-view-templates.md)
