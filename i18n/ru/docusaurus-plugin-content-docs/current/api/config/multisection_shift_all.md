---
sidebar_label: multisection_shift_all
title: "multisection_shift_all конфигурация"
description: "Указывает, следует ли при перетаскивании событий, назначенных нескольким секциям Timeline или Units view, все экземпляры должны перетаскиваться одновременно ('true') или только выбранный ('false')"
---

# multisection_shift_all
:::info
 Эта функциональность доступна только в версии PRO.
:::
### Description

@short: Определяет, должны ли при перетаскивании событий, назначенных нескольким секциям в Timeline или Units view, перетаскиваться все экземпляры сразу ('true') или только выбранный ('false')

@signature: multisection_shift_all: boolean

### Example

~~~jsx
scheduler.config.multisection_shift_all = false;

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Timeline view](views/timeline.md), [Units view](views/units.md)

### Related samples
- [События в нескольких секциях в Timeline и Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

### Details

:::note
 Свойство влияет только на перетаскивание событий вертикально (между секциями)
:::

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#displaying-units-for-multiple-days)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)