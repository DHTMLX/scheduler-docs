---
sidebar_label: "occurrence_timestamp_in_utc"
title: "occurrence_timestamp_in_utc config"
description: "Ermöglicht die Verwaltung von wiederkehrenden Events, ohne sich um Zeitzonen sorgen zu müssen"
---

# occurrence_timestamp_in_utc

### Description

@short: Ermöglicht die Verwaltung von wiederkehrenden Events, ohne sich um Zeitzonen sorgen zu müssen

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Details

:::note
 Diese Eigenschaft benötigt die Aktivierung der [recurring](guides/extensions-list.md#recurring) Erweiterung. 
:::

:::note

Achtung! Diese Option ist für Scheduler gedacht, die gerade erst mit wiederkehrenden Events starten.
Das Aktivieren bei Scheduler, die bereits wiederkehrende Events enthalten, kann zu Problemen führen.
 
:::
- Wenn aktiviert, werden Event-Timestamps als UNIX-Zeit gespeichert.
- Diese Option ist seit Version 3.5 verfügbar.

### Related Guides
- [Wiederkehrende Ereignisse](guides/recurring-events.md)
