---
sidebar_label: details_on_create
title: "details_on_create config"
description: "'says' to use the extended form while creating new events by drag or double click"
---

# details_on_create

### Description

@short: 'says' to use the extended form while creating new events by drag or double click

@signature: details_on_create: boolean

### Example

~~~jsx
scheduler.config.details_on_create=true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Change log
- Default value changed to `true` in v7.0
