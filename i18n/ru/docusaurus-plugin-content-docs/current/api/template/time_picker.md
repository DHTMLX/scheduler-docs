---
sidebar_label: "time_picker"
title: "time_picker template"
description: "предоставляет выпадающий селектор времени внутри lightbox"
---

# time_picker

### Description

@short: Предоставляет выпадающий селектор времени внутри lightbox

@signature: time_picker: () =\> string

### Returns
- ` text` - (string) - html-текст, используемый для рендеринга внутри scheduler

### Example

~~~jsx
scheduler.templates.time_picker = 
scheduler.date.date_to_str(scheduler.config.hour_date);
~~~

### Related API
- [hour_date](api/config/hour_date.md)

### Related Guides
- [Общие шаблоны](guides/common-templates.md#lightbox)
