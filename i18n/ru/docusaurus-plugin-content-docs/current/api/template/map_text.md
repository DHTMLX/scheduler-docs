---
sidebar_label: "map_text"
title: "map_text template"
description: "определяет текст, отображаемый во втором столбце представления"
---

# map_text

### Description

@short: Определяет текст, отображаемый во втором столбце представления

@signature: map_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.map_text = function(start,end,ev){
    return ev.text;
};
~~~

**Доступные представления:** [Map view](views/map.md)

### Details

:::note
 Для работы шаблона требуется включение плагина [map_view](guides/extensions-list.md#mapview). 
:::

Обратите внимание, что если шаблон [map_text](api/template/map_text.md) не определён, дата ('d-m-y'), отображаемая в popup-маркере Google Maps, будет форматироваться согласно шаблону [day_date](api/template/day_date.md).

### Related Guides
- [Шаблоны Map View](views/map-view-templates.md)
