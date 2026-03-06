---
sidebar_label: preserve_length
title: "preserve_length config"
description: "preserves the visible length of an event while dragging along a non-linear time scale"
---

# preserve_length

### Description

@short: Preserves the visible length of an event while dragging along a non-linear time scale

@signature: preserve_length: boolean

### Example

~~~jsx
scheduler.config.preserve_length = true;
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Details

Mode is enabled by default.

When the mode is enabled, an event preserves the visible length, instead of the actual length (defined by start and end dates ) during the drag-and-drop operation.
<br> Let's assume that you have a two-day event in the Month view and the weekends are hidden. If you drag the event and place it to occupy Friday and Monday length, the real difference between start and end day will be 4 days, 
but the scheduler will preserve the visible length - 2 days.
