---
sidebar_label: "limit_time_select"
title: "limit_time_select config"
description: "通过设置 'last_hour' 和 'first_hour' 选项的最大值和最小值，限制 lightbox 中时间选择器的时间范围。"
---

# limit_time_select

### Description

@short: 通过设置 'last_hour' 和 'first_hour' 选项的最大值和最小值，限制 lightbox 中时间选择器的时间范围。

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)
