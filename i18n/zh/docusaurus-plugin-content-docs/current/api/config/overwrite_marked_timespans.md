---
sidebar_label: "overwrite_marked_timespans"
title: "overwrite_marked_timespans config"
description: "控制标记时间段的阻塞优先级"
---

# overwrite_marked_timespans

### Description

@short: 控制标记时间段的阻塞优先级

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Default value:** true

### Details

标记时间段根据其设置具有不同的优先级。
当多个具有不同优先级的标记时间段在调度器的同一区域重叠时，
默认情况下只显示优先级最高的标记。

关闭此选项将允许您看到所有已设置的标记:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- [Blocking and Marking Dates](guides/limits.md#blockingpriority)

### Change log
- 6.0 版本新增
