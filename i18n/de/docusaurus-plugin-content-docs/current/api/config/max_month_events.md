---
sidebar_label: "max_month_events"
title: "max_month_events config"
description: "steuert die maximale Anzahl von Events, die in einer einzelnen Zelle angezeigt werden"
---

# max_month_events

### Description

@short: Steuert die maximale Anzahl von Events, die in einer einzelnen Zelle angezeigt werden

@signature: max_month_events: number

### Example

~~~jsx
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2013,5,30),"month");
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Wenn die Anzahl der einem Zell zugewiesenen Events dieses Limit überschreitet, zeigt der Scheduler einen 'View more'-Link an. Ein Klick auf diesen Link führt den Benutzer zur Tagesansicht, in der alle Events dieses Tages vollständig aufgelistet sind.

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Monatsansicht](views/month.md)
