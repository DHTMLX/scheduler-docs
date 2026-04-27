---
sidebar_label: auto_end_date
title: "Конфигурация auto_end_date"
description: "позволяет автоматически изменять дату окончания события после изменения даты начала"
---

# auto_end_date

### Description

@short: Позволяет автоматически изменять дату окончания события после изменения даты начала

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Значение по умолчанию:** false

### Related samples
- [Автоматическая дата окончания](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Чекбокс во lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Параметр доступен начиная с версии 2.3.
- Параметр используется только в паре с опцией [event_duration](api/config/event_duration.md).
- Если параметр установлен в *true*, то при изменении времени или даты начала события во всплывающем окне время и дата окончания будут изменяться автоматически, чтобы продолжительность события соответствовала значению опции [event_duration](api/config/event_duration.md).

### Related API
- [event_duration](api/config/event_duration.md)