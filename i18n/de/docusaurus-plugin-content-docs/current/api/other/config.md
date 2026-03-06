---
sidebar_label: "config"
title: "config config"
description: "definiert Konfigurationsoptionen für Daten, Skala, Steuerungen"
---

# config

### Description

@short: Definiert Konfigurationsoptionen für Daten, Skala, Steuerungen

@signature: config: SchedulerConfigOptions

### Example

~~~jsx
//setzt das Format der Y-Achsen-Elemente
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "month");
~~~

### Details

Die Eigenschaften des **config**-Objekts werden ausführlich in einem eigenen Abschnitt der Haupt-API-Seite [Scheduler API: Properties](api/overview/properties_overview.md) behandelt.
