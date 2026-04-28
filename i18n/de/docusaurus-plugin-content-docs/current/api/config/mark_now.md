---
sidebar_label: "mark_now"
title: "mark_now config"
description: "Schaltet den Marker für die aktuelle Zeit ein oder aus"
---

# mark_now

### Description

@short: Schaltet den Marker für die aktuelle Zeit ein oder aus

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 Diese Funktion ist abhängig davon, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

:::note
 Für die Timeline-Ansicht stellen Sie sicher, dass die [limit](guides/extensions-list.md#limit) Erweiterung vor der [Timeline](guides/extensions-list.md#timeline) Erweiterung auf der Seite geladen wird. 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
