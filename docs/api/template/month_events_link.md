---
sidebar_label: month_events_link
title: "month_events_link template"
description: "specifies the presentation of the 'View more' link in a cell of the Month view"
---

# month_events_link

### Description

@short: Specifies the presentation of the 'View more' link in a cell of the Month view

@signature: month_events_link: (date: Date, count: number) =\> string

### Parameters

- `date` - (required) *Date* - the date of a month cell
- `count` - (required) *number* - the number of events in the cell

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
// default definition
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
- [Month View](views/month.md)
