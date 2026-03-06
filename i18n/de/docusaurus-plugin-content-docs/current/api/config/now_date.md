---
sidebar_label: "now_date"
title: "now_date config"
description: "Legt das Datum für den aktuellen Zeitmarker in der Limit-Erweiterung fest (aktiviert über die - mark_now Konfiguration)"
---

# now_date

### Description

@short: Legt das Datum für den aktuellen Zeitmarker in der Limit-Erweiterung fest (aktiviert über die - mark_now Konfiguration)

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2010, 7, 5);
...
scheduler.init('scheduler_here', new Date(2010, 7, 5), "week");
~~~

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Diese Option wird speziell mit der [Limit-Erweiterung](guides/limits.md) verwendet.

### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
