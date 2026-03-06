---
sidebar_label: "time_picker"
title: "time_picker template"
description: "bietet den Drop-down Zeitselektor innerhalb der Lightbox"
---

# time_picker

### Description

@short: Bietet den Drop-down Zeitselektor innerhalb der Lightbox

@signature: time_picker: () =\> string

### Returns
- ` text` - (string) - HTML-Text, der für das Rendering innerhalb des Schedulers verwendet wird

### Example

~~~jsx
scheduler.templates.time_picker = 
scheduler.date.date_to_str(scheduler.config.hour_date);
~~~

### Related API
- [hour_date](api/config/hour_date.md)

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#lightbox)
