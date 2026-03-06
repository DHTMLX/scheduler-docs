---
sidebar_label: "auto_end_date"
title: "auto_end_date config"
description: "автоматически обновляет дату окончания события при изменении даты начала"
---

# auto_end_date

### Description

@short: Автоматически обновляет дату окончания события при изменении даты начала

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Этот параметр доступен начиная с версии 2.3.
- Он предназначен для использования вместе с опцией [event_duration](api/config/event_duration.md).
- При значении *true* изменение времени или даты начала события в lightbox автоматически обновляет время и дату окончания, чтобы сохранить длительность события, заданную в 
опции [event_duration](api/config/event_duration.md).

### Related API
- [event_duration](api/config/event_duration.md)
