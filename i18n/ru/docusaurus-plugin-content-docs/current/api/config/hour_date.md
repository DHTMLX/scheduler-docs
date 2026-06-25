---
sidebar_label: hour_date
title: "hour_date конфигурация"
description: "устанавливает формат времени оси Y. Также используется в шаблонах по умолчанию для событий и lightbox-шаблонов для задания временной части."
---

# hour_date

### Description

@short: Задает формат времени оси Y. Также используется в шаблонах по умолчанию для событий и lightbox-шаблонов для задания временной части.

@signature: hour_date: string

### Example

~~~jsx
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Ззначение по умолчанию:** "%H:%i"

**Поддерживаемые представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Формат Y-оси](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)
- [Удаление лишних часов с временной шкалы](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

![weekView_properties](/img/weekView_properties.png)

### Related API
- [hour_size_px](api/config/hour_size_px.md)
- [event_header](api/template/event_header.md)
- [event_date](api/template/event_date.md)
- [event_bar_date](api/template/event_bar_date.md)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)