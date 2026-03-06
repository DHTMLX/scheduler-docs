---
sidebar_label: "fix_tab_position"
title: "fix_tab_position config"
description: "сдвигает вкладки видов с левой стороны на правую сторону"
---

# fix_tab_position

### Description

@short: Сдвигает вкладки видов с левой стороны на правую сторону

@signature: fix_tab_position: boolean

### Example

~~~jsx
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

Эта опция доступна с версии 3.5. 

По умолчанию, планировщик с скином ['dhx_terrace'](guides/skins.md) показывает вкладки видов слева. Чтобы переместить вкладки на правую сторону, просто установите эту опцию в *false*.

### Related Guides
- [Разметка Scheduler](guides/scheduler-markup.md#tabs-positioning)
