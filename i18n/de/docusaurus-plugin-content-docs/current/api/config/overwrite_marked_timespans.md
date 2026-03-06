---
sidebar_label: "overwrite_marked_timespans"
title: "overwrite_marked_timespans config"
description: "steuert die Blockierungspriorität für markierte Zeitspannen"
---

# overwrite_marked_timespans

### Description

@short: Steuert die Blockierungspriorität für markierte Zeitspannen

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Default value:** true

### Details

Markierte Zeitspannen haben unterschiedliche Prioritätsstufen basierend auf ihren Einstellungen.
Wenn mehrere markierte Zeitspannen mit unterschiedlichen Prioritäten im selben Bereich des Schedulers überlappen,
werden standardmäßig nur die Marker mit der höchsten Priorität angezeigt.

Wenn diese Option deaktiviert wird, sehen Sie alle gesetzten Marker:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md#blocking-priority)

### Change log
- hinzugefügt in v6.0
