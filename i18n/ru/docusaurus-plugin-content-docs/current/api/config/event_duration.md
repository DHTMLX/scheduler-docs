---
sidebar_label: "event_duration"
title: "event_duration config"
description: "задаёт начальную длительность событий в минутах"
---

# event_duration

### Description

@short: Задаёт начальную длительность событий в минутах

@signature: event_duration: number

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here', new Date(2013, 05, 11), "week");
~~~

**Default value:** 5

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Этот параметр доступен начиная с версии 2.3.
- Работает только вместе с опцией [auto_end_date](api/config/auto_end_date.md).
- Когда опция [auto_end_date](api/config/auto_end_date.md) включена (установлена в *true*), изменение времени или даты начала события в lightbox автоматически обновляет время и дату окончания, чтобы сохранить длительность, заданную настройкой 'event_duration'.

### Related API
- [auto_end_date](api/config/auto_end_date.md)
