---
sidebar_label: "limit_view"
title: "limit_view config"
description: "限制用户浏览事件的日期范围"
---

# limit_view

### Description

@short: 限制用户浏览事件的日期范围

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2022,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Default value:** false

### Details

例如，将限制设置为2023年，意味着用户无法导航到2022年--只能访问2023年内的日期。

如果同时定义了用于限制新事件创建时间段的 **limit_start/limit_end** 设置，**limit_view** 将阻止查看该允许日期范围之外的事件。

~~~js
scheduler.config.limit_start = new Date(2022,5,15);
scheduler.config.limit_end = new Date(2022,6,15);
scheduler.config.limit_view  = true;
~~~

通过这种配置，事件只能在6月15日至7月15日之间创建，日历导航也限制在该日期范围内。

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
