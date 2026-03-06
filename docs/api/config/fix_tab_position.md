---
sidebar_label: fix_tab_position
title: "fix_tab_position config"
description: "moves views' tabs from the left to the right side"
---

# fix_tab_position

### Description

@short: Moves views' tabs from the left to the right side

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

The property is available from version 3.5. 

By default, the ['dhx_terrace'-skinned scheduler](guides/skins.md#terrace-skin) presents the views tabs on the left side. To place the tabs on the right side - set the option to *false*.

### Related Guides
- [Scheduler Markup](guides/scheduler-markup.md#tabs-positioning)
