---
sidebar_label: "resize_month_timed"
title: "resize_month_timed config"
description: "Ermöglicht das Ändern der Größe von eintägigen Events in der Monatsansicht per Drag-and-Drop"
---

# resize_month_timed

### Description

@short: Ermöglicht das Ändern der Größe von eintägigen Events in der Monatsansicht per Drag-and-Drop

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Details

**Bitte beachten Sie:**

- Diese Eigenschaft funktioniert nur, wenn die Option [resize_month_events](api/config/resize_month_events.md) aktiviert ist.
- Sobald aktiviert, erhalten eintägige Events ein aktualisiertes Erscheinungsbild, wie im Folgenden dargestellt:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- [Monatsansicht](views/month.md#resizing-events-by-drag-n-drop-ver-41)
