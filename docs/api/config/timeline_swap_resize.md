---
sidebar_label: timeline_swap_resize
title: "timeline_swap_resize config"
description: "defines that during event resizing the end date of the event can be swapped for the start date (after the end date becomes scheduled before the start one)"
---

# timeline_swap_resize
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines that during event resizing the end date of the event can be swapped for the start date (after the end date becomes scheduled before the start one)

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Default value:** true

### Details

:::note
 The property requires the [timeline](guides/extensions-list.md#timeline) plugin to be enabled. 
:::

If the property is set to *false*, it won't allow you to drag the end date to the left of the start date (and vice versa) when you resize event via drag and drop.

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#timeline)

### Change log
- added in version 4.4
