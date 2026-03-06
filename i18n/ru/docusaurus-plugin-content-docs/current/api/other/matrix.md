---
sidebar_label: "matrix"
title: "matrix config"
description: "хранит объекты конфигурации всех timeline, указанных на странице"
---

# matrix

### Description

@short: Хранит объекты конфигурации всех timeline, указанных на странице

@signature: matrix: any

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size: 24,
    x_start: 16,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});

var configObj = scheduler.matrix;
~~~

### Related samples
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

Переменная **configObj** содержит следующую структуру:

~~~js
{
    myTimeline:{
        name:    "myTimeline",
        x_unit:    "minute",
        ...
    }
}
~~~

:::note

Это свойство позволяет динамически изменять конфигурацию timeline. <br>
Однако, если требуется внести значительные изменения в настройку, обычно лучше определить несколько объектов конфигурации и заменить текущий timeline, а не изменять свойство **matrix** напрямую.
 
:::

Например, если нужно обновить значения x_step, x_size и x_start для timeline из приведённого выше примера:

~~~
//один из вариантов:
configObj.x_step = 50;
configObj.x_size = 28;
configObj.x_start = 20;
scheduler.updateView();

//но более эффективный способ:

scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    50,
    x_size: 28,
    x_start: 20,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});
~~~
*если timeline создаётся с именем, которое уже существует, scheduler не добавит новый timeline, а обновит существующий.*
