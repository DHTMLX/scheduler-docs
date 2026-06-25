---
sidebar_label: show_loading
title: "show_loading config"
description: "enables showing a progress/spinner while data is loading (useful for dynamic loading)"
---

# show_loading

### Description

@short: Enables showing a progress/spinner while data is loading (useful for dynamic loading)

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** false

### Related Guides
- [Loading Data](guides/loading-data.md#dynamic-loading)
