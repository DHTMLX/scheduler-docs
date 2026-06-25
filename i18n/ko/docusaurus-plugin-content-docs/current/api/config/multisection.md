---
sidebar_label: "multisection"
title: "multisection config"
description: "Timeline 또는 Units 뷰에서 동일한 이벤트를 여러 섹션에 걸쳐 렌더링할 수 있도록 합니다."
---

# multisection
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Timeline 또는 Units 뷰에서 동일한 이벤트를 여러 섹션에 걸쳐 렌더링할 수 있도록 합니다.

@signature: multisection: boolean

### Example

~~~jsx
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2027, 5, 30), "timeline");
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Related API
- [multisection_shift_all](api/config/multisection_shift_all.md)

### Related Guides
- ["Units View"](views/units.md#assigningeventstoseveralunits)
- ["타임라인 뷰"](views/timeline.md#assignmentofeventstoseveralsections)
