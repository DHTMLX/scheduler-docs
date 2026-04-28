---
sidebar_label: day_date
title: "day_date конфигурация"
description: "устанавливает формат даты для оси X в представлениях Week и Units"
---

# day_date

### Description

@short: Устанавливает формат даты для оси X в представлениях Week и Units

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Значение по умолчанию:** "%D, %F %j"

**Доступные представления:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

Конфигурация вступит в силу только если она применяется до первой инициализации scheduller:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2027, 7, 5), "day");
~~~

Если вы хотите изменить формат даты после инициализации, необходимо переопределить шаблон [day_date](api/template/day_date.md):

~~~js
var formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)
- [Форматирование меток, дат, стилей](guides/templates.md)