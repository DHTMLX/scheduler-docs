---
sidebar_label: "TIMELINE_second_scale_date"
title: "TIMELINE_second_scale_date template"
description: "определяет элементы, отображаемые на вторичной оси X"
---

# TIMELINE_second_scale_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет элементы, отображаемые на вторичной оси X

@signature: TIMELINE_second_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html-контент, используемый для отображения в scheduler

### Example

~~~jsx
scheduler.templates.timeline_second_scale_date = function(date){
    var timeline = scheduler.matrix.timeline;
    var func = scheduler.date.date_to_str(
        (timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
    return func(date);
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот template работает только при включенном плагине [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
