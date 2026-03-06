---
sidebar_label: GRID_full_date
title: "GRID_full_date template"
description: "specifies the format of dates in columns with id='date'"
---

# GRID_full_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the format of dates in columns with id='date'

@signature: GRID_full_date: (start: Date, end: Date, ev: object) =\> string;

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin  
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `ev` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.grid_full_date = function(start,end,event){
    if (scheduler.isOneDayEvent(event))
        return scheduler.templates.grid_single_date(start);
    else
        return scheduler.templates.day_date(start)+" &ndash; "
           +scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 The template requires the [grid_view](guides/extensions-list.md#grid-view) plugin to be activated. 
:::

### Related API
- [GRID_single_date](api/template/gridname_single_date.md)

### Related Guides
- [Grid View Templates](views/grid-view-templates.md)
