---
sidebar_label: use_select_menu_space
title: "use_select_menu_space config"
description: "defines that events occupy the whole width of the cell"
---

# use_select_menu_space

### Description

@short: Defines that events occupy the whole width of the cell

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

By default events occupy the whole width of the cell. Set the option to *false* for an event to occupy just a part of the cell's width and leave space for the left-side menu.

### Change log
- The property is available from version 3.5.
