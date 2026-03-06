---
sidebar_label: max_month_events
title: "max_month_events config"
description: "sets the maximum number of events displayable in a cell"
---

# max_month_events

### Description

@short: Sets the maximum number of events displayable in a cell

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

If the number of assigned events exceeds the option's value, the scheduler will display the 'View more' link. The link will 
redirect the user to the Day view displaying a full list of assigned events.

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Month View](views/month.md)
