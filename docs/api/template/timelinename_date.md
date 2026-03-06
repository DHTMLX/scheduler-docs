---
sidebar_label: TIMELINE_date
title: "TIMELINE_date template"
description: "specifies the date in the header of the view"
---

# TIMELINE_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the date in the header of the view

@signature: TIMELINE_date: (date1: Date, date2: Date) =\> string;

### Parameters

- `date1` - (required) *Date* - the date when an event is scheduled to begin
- `date2` - (required) *Date* - the date when an event is scheduled to be completed

### Returns
- ` text` - (string) - html text for rendering in the scheduler

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
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

Note, if the [timeline_date](api/template/timelinename_date.md) template isn't specified, the date in the header will be set according to the [week_date](api/template/week_date.md) template.

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
