---
sidebar_label: onViewMoreClick
title: "onViewMoreClick event"
description: "fires when the user clicks on the 'View more' link in the Month view (the Month view only)"
---

# onViewMoreClick

### Description

@short: Fires when the user clicks on the 'View more' link in the Month view (the Month view only)

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (required) *object* - the date of the cell inside which the user clicks on the 'View more' link

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    //any custom logic here
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

The event is blockable. Return *false*, and the Month view won't be changed to the Day view after clicking on the 'View more' link.

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- [Month View](views/month.md#limiting-the-number-of-events-in-a-cell)
