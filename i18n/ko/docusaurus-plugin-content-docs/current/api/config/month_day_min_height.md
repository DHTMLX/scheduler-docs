---
sidebar_label: "month_day_min_height"
title: "month_day_min_height config"
description: "Month 뷰에서 셀의 최소 높이를 설정합니다."
---

# month_day_min_height

### Description

@short: Month 뷰에서 셀의 최소 높이를 설정합니다.

@signature: month_day_min_height: number

### Example

~~~jsx
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here', new Date(2027,5,30), "month");
~~~

**Default value:** 90

**Applicable views:** [Month view](views/month.md)

### Details

:::note
 이 속성은 [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [month_day](api/config/month_day.md)
