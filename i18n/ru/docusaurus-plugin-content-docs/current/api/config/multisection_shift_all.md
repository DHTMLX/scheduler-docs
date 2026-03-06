---
sidebar_label: "multisection_shift_all"
title: "multisection_shift_all config"
description: "управляет тем, перемещаются ли при перетаскивании событий, назначенных нескольким секциям в Timeline или Units view, все экземпляры одновременно ('true') или только выбранный ('false')"
---

# multisection_shift_all
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Управляет тем, перемещаются ли при перетаскивании событий, назначенных нескольким секциям в Timeline или Units view, все экземпляры одновременно ('true') или только выбранный ('false')

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
 Этот параметр применяется только при вертикальном перетаскивании событий (между секциями) 
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md)
- [Вид 'Timeline'](views/timeline.md)
