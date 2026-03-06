---
sidebar_label: "time_picker"
title: "time_picker template"
description: "提供在 lightbox 中的下拉时间选择器"
---

# time_picker

### Description

@short: 提供在 lightbox 中的下拉时间选择器

@signature: time_picker: () =\> string

### Returns
- ` text` - (string) - 用于在 scheduler 内部渲染的 html 文本

### Example

~~~jsx
scheduler.templates.time_picker = 
scheduler.date.date_to_str(scheduler.config.hour_date);
~~~

### Related API
- [hour_date](api/config/hour_date.md)

### Related Guides
- [공통 템플릿](guides/common-templates.md#lightbox)
