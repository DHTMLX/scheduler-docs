---
sidebar_label: "auto_end_date"
title: "auto_end_date config"
description: "当开始日期被调整时，自动更新事件的结束日期"
---

# auto_end_date

### Description

@short: 当开始日期被调整时，自动更新事件的结束日期

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- 该设置自版本 2.3 起可用。
- 它旨在与 [event_duration](api/config/event_duration.md) 选项配合使用。
- 当设置为 *true* 时，在 lightbox 中调整事件的开始时间或日期会自动更新结束时间和日期，以保持由 [event_duration](api/config/event_duration.md) 选项指定的事件持续时间。

### Related API
- [event_duration](api/config/event_duration.md)
