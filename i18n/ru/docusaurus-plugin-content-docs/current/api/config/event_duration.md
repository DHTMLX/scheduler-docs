---
sidebar_label: event_duration
title: "event_duration config"
description: "устанавливает начальную продолжительность событий в минутах"
---

# event_duration

### Description

@short: Устанавливает начальную продолжительность событий в минутах

@signature: event_duration: number

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 5

### Related samples
- [Автоматическая конечная дата](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Чекбокс во lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- Параметр доступен начиная с версии 2.3.
- Параметр используется только в паре с опцией [auto_end_date](api/config/auto_end_date.md).
- Если опция [auto_end_date](api/config/auto_end_date.md) установлена в значение *true*, тогда, когда вы изменяете время начала события или дату в lightbox, время и дата окончания события будут автоматически изменяться, чтобы продолжительность события соответствовала значению параметра 'event_duration'.

### Related API
- [auto_end_date](api/config/auto_end_date.md)