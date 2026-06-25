---
sidebar_label: "full_day"
title: "full_day config"
description: "允许将事件设置为全天持续"
---

# full_day

### Description

@short: 允许将事件设置为全天持续

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** false

### Related samples
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

启用此选项（*true*）时，lightbox 中用于选择时间段的字段将被禁用，事件持续时间自动设置为覆盖全天--从所选日期的**00:00**开始，到次日的**00:00**结束。

### Change log
- 2.3 版本新增
