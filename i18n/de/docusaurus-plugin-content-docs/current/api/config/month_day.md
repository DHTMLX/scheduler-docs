---
sidebar_label: "month_day"
title: "month_day config"
description: "definiert das Format zur Anzeige des Tages in den Zellen der Monats- und Jahresansichten"
---

# month_day

### Description

@short: Definiert das Format zur Anzeige des Tages in den Zellen der Monats- und Jahresansichten

@signature: month_day: string

### Example

~~~jsx
scheduler.config.month_day="%j";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%d"

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
