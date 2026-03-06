---
sidebar_label: time_picker
title: "time_picker template"
description: "specifies the drop-down time selector in the lightbox"
---

# time_picker

### Description

@short: Specifies the drop-down time selector in the lightbox

@signature: time_picker: () =\> string

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.time_picker = 
scheduler.date.date_to_str(scheduler.config.hour_date);
~~~

### Related API
- [hour_date](api/config/hour_date.md)

### Related Guides
- [Common Templates](guides/common-templates.md#lightbox)
