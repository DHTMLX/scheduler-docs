---
sidebar_label: "resize_month_events"
title: "resize_month_events config"
description: "드래그 앤 드롭을 사용하여 Month 뷰에서 며칠간 계속되는 이벤트의 크기를 조절할 수 있게 합니다."
---

# resize_month_events

### Description

@short: 드래그 앤 드롭을 사용하여 Month 뷰에서 며칠간 계속되는 이벤트의 크기를 조절할 수 있게 합니다.

@signature: resize_month_events: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true;

scheduler.init('scheduler_here', new Date(2010,0,10), "month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)

### Details

![resize_month_events](/img/resize_month_events.png)

### Related API
- [resize_month_timed](api/config/resize_month_timed.md)

### Related Guides
- ["Month View"](views/month.md)
