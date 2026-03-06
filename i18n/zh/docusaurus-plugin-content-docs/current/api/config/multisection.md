---
sidebar_label: "multisection"
title: "multisection config"
description: "允许在 Timeline 或 Units 视图中跨多个 section 渲染相同的事件"
---

# multisection
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 允许在 Timeline 或 Units 视图中跨多个 section 渲染相同的事件

@signature: multisection: boolean

### Example

~~~jsx
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Related API
- [multisection_shift_all](api/config/multisection_shift_all.md)

### Related Guides
- [Units View](views/units.md#assigningeventstoseveralunits)
- [타임라인 뷰](views/timeline.md#assignmentofeventstoseveralsections)
