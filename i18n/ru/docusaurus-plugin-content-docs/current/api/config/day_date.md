---
sidebar_label: "day_date"
title: "day_date config"
description: "задаёт формат даты, используемый на оси X в представлениях Week и Units"
---

# day_date

### Description

@short: Задаёт формат даты, используемый на оси X в представлениях Week и Units

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** "%D, %F %j"

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

Эта настройка вступает в силу только если она задана до первой инициализации scheduler:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2020, 7, 5), "day");
~~~

Чтобы обновить формат даты после инициализации, необходимо переопределить шаблон [day_date](api/template/day_date.md):

~~~js
var formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)
- [Форматирование меток, дат, стилей](guides/templates.md)
