---
sidebar_label: event_class
title: "event_class template"
description: "specifies the CSS class that will be applied to the event's container"
---

# event_class

### Description

@short: Specifies the CSS class that will be applied to the event's container

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `ev` - (required) *object* - the event's object

### Returns
- `css_class` - (string) - the CSS class for the related element

### Example

~~~jsx
scheduler.templates.event_class = (start, end, ev) => {
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

In the Timeline view, the template is applied to 'Bar' and 'Tree' modes only.

Check the full information about customizing event colors in the related article [Custom Event's Color](guides/custom-events-color.md).

### Related Guides
- [Custom Event's Color](guides/custom-events-color.md)
- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
