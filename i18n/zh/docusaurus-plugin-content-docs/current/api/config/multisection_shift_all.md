---
sidebar_label: "multisection_shift_all"
title: "multisection_shift_all config"
description: "控制在 Timeline 或 Units 视图中拖动分配给多个 section 的事件时，是否同时移动所有实例（'true'）还是仅移动选中的那个（'false'）"
---

# multisection_shift_all
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 控制在 Timeline 或 Units 视图中拖动分配给多个 section 的事件时，是否同时移动所有实例（'true'）还是仅移动选中的那个（'false'）

@signature: multisection_shift_all: boolean

### Example

~~~jsx
scheduler.config.multisection_shift_all = false;

scheduler.init('scheduler_here', new Date(2027, 5, 30), "timeline");
~~~

**Default value:** true

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Details

:::note
 该设置仅适用于垂直拖动事件（在不同 section 之间移动） 
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#assigningeventstoseveralunits)
- [타임라인 뷰](views/timeline.md#assignmentofeventstoseveralsections)
