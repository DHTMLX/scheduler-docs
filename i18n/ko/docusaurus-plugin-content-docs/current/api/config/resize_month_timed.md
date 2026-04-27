---
sidebar_label: "resize_month_timed"
title: "resize_month_timed config"
description: "월별 뷰에서 단일 날짜 이벤트를 드래그 앤 드롭으로 크기 조절할 수 있도록 허용합니다"
---

# resize_month_timed

### Description

@short: 월별 뷰에서 단일 날짜 이벤트를 드래그 앤 드롭으로 크기 조절할 수 있도록 허용합니다

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Details

**참고:**

- 이 속성은 [resize_month_events](api/config/resize_month_events.md) 옵션이 활성화된 경우에만 작동합니다.
- 활성화되면, 단일 날짜 이벤트는 다음과 같이 업데이트된 모습으로 표시됩니다:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- ["Month View"](views/month.md)
