---
sidebar_label: "week_date"
title: "week_date config"
description: "Definiert das Datumsformat, das in der Sub-Header-Ansicht der Monatsansicht angezeigt wird."
---

# week_date

### Description

@short: Definiert das Datumsformat, das in der Sub-Header-Ansicht der Monatsansicht angezeigt wird.

@signature: week_date: string

### Example

~~~jsx
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%l"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
