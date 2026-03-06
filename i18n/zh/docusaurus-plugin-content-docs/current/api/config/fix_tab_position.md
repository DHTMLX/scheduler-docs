---
sidebar_label: "fix_tab_position"
title: "fix_tab_position config"
description: "将视图的 tabs 从左侧移到右侧"
---

# fix_tab_position

### Description

@short: 将视图的 tabs 从左侧移到右侧

@signature: fix_tab_position: boolean

### Example

~~~jsx
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

此选项自版本 3.5 起可用。

默认情况下，['dhx_terrace' 皮肤](guides/skins.md#terrace-skin) 的 scheduler 会将视图的 tabs 显示在左侧。若要将 tabs 移动到右侧，只需将此选项设置为 *false*。

### Related Guides
- [스케줄러 마크업](guides/scheduler-markup.md#tabs-positioning)
