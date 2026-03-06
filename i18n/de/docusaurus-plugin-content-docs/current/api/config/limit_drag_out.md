---
sidebar_label: "limit_drag_out"
title: "limit_drag_out config"
description: "Verhindert das Ziehen von Events außerhalb des sichtbaren Bereichs des Schedulers"
---

# limit_drag_out

### Description

@short: Verhindert das Ziehen von Events außerhalb des sichtbaren Bereichs des Schedulers

@signature: limit_drag_out: boolean

### Example

~~~jsx
// Verhindert das Ziehen von Events außerhalb des sichtbaren Timeline-Bereichs
scheduler.config.limit_drag_out = true;
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md)
