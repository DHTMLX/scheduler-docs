---
sidebar_label: "use_select_menu_space"
title: "use_select_menu_space config"
description: "定义事件是否占用单元格的整个宽度"
---

# use_select_menu_space

### Description

@short: 定义事件是否占用单元格的整个宽度

@signature: use_select_menu_space: boolean

### Example

~~~jsx
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

默认情况下，事件会延伸占满单元格的整个宽度。将此选项设置为 *false*，事件只覆盖单元格宽度的一部分，左侧会留出空间用于菜单。

### Change log
- 此属性自版本 3.5 起可用。
