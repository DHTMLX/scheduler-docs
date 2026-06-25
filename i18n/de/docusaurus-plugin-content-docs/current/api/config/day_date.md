---
sidebar_label: "day_date"
title: "day_date config"
description: "Gibt das Datumsformat an, das auf der X-Achse in den Ansichten Week und Units verwendet wird"
---

# day_date

### Description

@short: Gibt das Datumsformat an, das auf der X-Achse in den Ansichten Week und Units verwendet wird

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** "%D, %F %j"

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

Diese Konfiguration wird nur wirksam, wenn sie vor der ersten Initialisierung des Schedulers gesetzt wird:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2027, 7, 5), "day");
~~~

Um das Datumsformat nach der Initialisierung zu ändern, muss das [day_date](api/template/day_date.md) Template überschrieben werden:

~~~js
const formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
- [Formatieren von Beschriftungen, Daten, Stilen](guides/templates.md)
