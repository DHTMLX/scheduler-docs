---
sidebar_label: tooltip_text
title: "tooltip_text template"
description: "specifies the text of tooltips"
---

# tooltip_text

### Description

@short: Specifies the text of tooltips

@signature: tooltip_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.tooltip_text = function(start,end,ev){
    return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    scheduler.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~

**Applicable views:** [Agenda view](views/agenda.md), [Day view](views/day.md), [Map view](views/map.md), [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Details

:::note
 The template requires the [tooltip](guides/extensions-list.md#tooltip) plugin to be enabled. 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Common Templates](guides/common-templates.md#tooltips)
