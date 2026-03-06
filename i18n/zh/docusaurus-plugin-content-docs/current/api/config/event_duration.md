---
sidebar_label: "event_duration"
title: "event_duration config"
description: "设置事件的初始持续时间（以分钟为单位）"
---

# event_duration

### Description

@short: 设置事件的初始持续时间（以分钟为单位）

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

- 该参数自版本 2.3 起可用。
- 仅在启用 [auto_end_date](api/config/auto_end_date.md) 选项时生效。
- 当 [auto_end_date](api/config/auto_end_date.md) 选项被启用（设置为 *true*）时，在 lightbox 中调整事件的开始时间或日期，会自动更新结束时间和日期，以保持由 'event_duration' 设置指定的持续时间。

### Related API
- [auto_end_date](api/config/auto_end_date.md)
