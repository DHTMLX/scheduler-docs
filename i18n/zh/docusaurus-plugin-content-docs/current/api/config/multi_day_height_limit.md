---
sidebar_label: "multi_day_height_limit"
title: "multi_day_height_limit config"
description: "控制显示多日事件部分的高度"
---

# multi_day_height_limit

### Description

@short: 控制显示多日事件部分的高度

@signature: multi_day_height_limit: number | boolean

### Example

~~~jsx
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Default value:** 200

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

当作为布尔值使用时，此属性仅接受 *false* 作为有效值。

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- 在 v7.0.1 版本中，默认值由 `false` 改为 `200`
