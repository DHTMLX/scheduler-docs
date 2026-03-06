---
sidebar_label: "multisection_shift_all"
title: "multisection_shift_all config"
description: "Timeline 또는 Units 뷰에서 여러 섹션에 할당된 이벤트를 드래그할 때, 모든 인스턴스를 함께 이동할지('true') 아니면 선택한 하나만 이동할지('false')를 제어합니다."
---

# multisection_shift_all
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Timeline 또는 Units 뷰에서 여러 섹션에 할당된 이벤트를 드래그할 때, 모든 인스턴스를 함께 이동할지('true') 아니면 선택한 하나만 이동할지('false')를 제어합니다.

@signature: multisection_shift_all: boolean

### Example

~~~jsx
scheduler.config.multisection_shift_all = false;

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");
~~~

**Default value:** true

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Details

:::note
 이 설정은 이벤트를 수직으로 드래그할 때(섹션 간 이동 시)에만 적용됩니다 
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- ["Units View"](views/units.md#assigningeventstoseveralunits)
- ["타임라인 뷰"](views/timeline.md#assignmentofeventstoseveralsections)
