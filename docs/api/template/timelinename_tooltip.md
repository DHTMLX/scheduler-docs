---
sidebar_label: TIMELINE_tooltip
title: "TIMELINE_tooltip template"
description: "specifies the tooltip over a day cell containing some scheduled event(s)"
---

# TIMELINE_tooltip
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the tooltip over a day cell containing some scheduled event(s)

@signature: TIMELINE_tooltip: (start: Date, end; date, event: object) =\> string;

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin  
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.timeline_tooltip = function(start,end,event){
    return event.text;
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
