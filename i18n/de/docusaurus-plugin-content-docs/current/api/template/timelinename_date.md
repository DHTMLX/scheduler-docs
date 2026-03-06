---
sidebar_label: "TIMELINE_date"
title: "TIMELINE_date template"
description: "definiert das Datum, das im Header der Ansicht angezeigt wird"
---

# TIMELINE_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert das Datum, das im Header der Ansicht angezeigt wird

@signature: TIMELINE_date: (date1: Date, date2: Date) =\> string;

### Parameters

- `date1` - (required) *Date* - das Startdatum eines Ereignisses
- `date2` - (required) *Date* - das Enddatum eines Ereignisses

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.timeline_date = function(date1, date2){
    if (date1.getDay()==date2.getDay() && date2-date1<(24*60*60*1000))
            return scheduler.templates.day_date(date1);
        return scheduler.templates.week_date(date1, date2); 
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Vorlage erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

Wenn die [timeline_date](api/template/timelinename_date.md) Vorlage nicht definiert ist, wird das Datum im Header standardmäßig im Format der [week_date](api/template/week_date.md) Vorlage angezeigt.

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
