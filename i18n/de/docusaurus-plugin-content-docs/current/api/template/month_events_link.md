---
sidebar_label: "month_events_link"
title: "month_events_link template"
description: "Steuert, wie der 'View more'-Link innerhalb einer Month-View-Zelle angezeigt wird"
---

# month_events_link

### Description

@short: Steuert, wie der 'View more'-Link innerhalb einer Month-View-Zelle angezeigt wird

@signature: month_events_link: (date: Date, count: number) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das der Monatszelle entspricht
- `count` - (required) *number* - die Gesamtanzahl der Events für diese Zelle

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
// Standardimplementierung
scheduler.templates.month_events_link = function(date, count){
    return "<a>View more("+count+" events)</a>";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Related API
- [max_month_events](api/config/max_month_events.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Monatsansicht](views/month.md)
