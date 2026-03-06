---
sidebar_label: preserve_scroll
title: "preserve_scroll config"
description: "cancels preserving of the current scroll position while navigating between dates of the same view"
---

# preserve_scroll

### Description

@short: Cancels preserving of the current scroll position while navigating between dates of the same view

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- The property is available from version 3.0.
- The property refers to the cases when the user navigates dates of the view <br> through this navigation panel -> ![navigation_panel](/img/navigation_panel.png).
