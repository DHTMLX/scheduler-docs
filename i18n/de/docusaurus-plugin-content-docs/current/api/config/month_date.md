---
sidebar_label: "month_date"
title: "month_date config"
description: "Definiert das Format für die Kopfzeile der Monatsansicht"
---

# month_date

### Description

@short: Definiert das Format für die Kopfzeile der Monatsansicht

@signature: month_date: string

### Example

~~~jsx
scheduler.config.month_date = "%F, %Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%F %Y"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
