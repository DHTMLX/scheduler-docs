---
sidebar_label: details_on_dblclick
title: "details_on_dblclick config"
description: "'says' to open the lightbox after double clicking on an event"
---

# details_on_dblclick

### Description

@short: 'says' to open the lightbox after double clicking on an event

@signature: details_on_dblclick: boolean

### Example

~~~jsx
scheduler.config.details_on_dblclick = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)

### Change log
- Default value changed to `true` in v7.0
