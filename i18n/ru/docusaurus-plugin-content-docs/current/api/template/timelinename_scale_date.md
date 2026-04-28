---
sidebar_label: "TIMELINE_scale_date"
title: "TIMELINE_scale_date template"
description: "определяет элементы, отображаемые на оси X"
---

# TIMELINE_scale_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет элементы, отображаемые на оси X

@signature: TIMELINE_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html-содержимое для отображения в scheduler

### Example

~~~jsx
scheduler.templates.timeline_scale_date = function(date){
   const timeline = scheduler.matrix.timeline;
   const func = scheduler.date.date_to_str(timeline.x_date||scheduler.config.hour_date);
   return func(date);
}
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
