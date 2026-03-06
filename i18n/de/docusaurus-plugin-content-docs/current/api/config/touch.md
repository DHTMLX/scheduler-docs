---
sidebar_label: "touch"
title: "touch config"
description: "Schaltet die Touch-Unterstützung im Scheduler ein oder aus"
---

# touch

### Description

@short: Schaltet die Touch-Unterstützung im Scheduler ein oder aus

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");
~~~

**Default value:** true

### Related samples
- [Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

Wenn der Parameter als String angegeben wird, akzeptiert er nur einen Wert - **'force'**.

<br>

Das bedeutet, der Parameter kann drei verschiedene Werte annehmen:

- *true* - der Scheduler versucht, ein Touch-Gerät zu erkennen, indem er den User-Agent-String des Browsers überprüft, und aktiviert die Touch-Unterstützung, wenn ein solches Gerät gefunden wird.
- *'force'* - hält die Touch-Unterstützung jederzeit aktiviert, unabhängig vom verwendeten Gerät.
- *false* - deaktiviert die Touch-Unterstützung.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
