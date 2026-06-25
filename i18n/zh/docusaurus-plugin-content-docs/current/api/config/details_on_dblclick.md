---
sidebar_label: "details_on_dblclick"
title: "details_on_dblclick config"
description: "通过双击事件来启用打开lightbox功能"
---

# details_on_dblclick

### Description

@short: 通过双击事件来启用打开lightbox功能

@signature: details_on_dblclick: boolean

### Example

~~~jsx
scheduler.config.details_on_dblclick = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)

### Change log
- 从版本7.0开始，默认设置更新为`true`
