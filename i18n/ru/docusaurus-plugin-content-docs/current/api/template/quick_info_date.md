---
sidebar_label: "quick_info_date"
title: "quick_info_date template"
description: "определяет дату, отображаемую в всплывающей форме редактирования"
---

# quick_info_date

### Description

@short: Определяет дату, отображаемую в всплывающей форме редактирования

@signature: quick_info_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата события
- `end` - (required) *Date* - конечная дата события
- `event` - (required) *object* - детали события

### Returns
- ` text` - (string) - html-текст, используемый для отображения в scheduler

### Example

~~~jsx
scheduler.templates.quick_info_date = function(start, end, ev){
    if (scheduler.isOneDayEvent(ev)){
        return scheduler.templates.day_date(start, end, ev) + " " +
            scheduler.templates.event_header(start, end, ev);
    }else{
        return scheduler.templates.week_date(start, end, ev);
    }
};
~~~

### Details

:::note
 Шаблон работает только при включенном плагине [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related Guides
- [Общие шаблоны](guides/common-templates.md#touch-support)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
