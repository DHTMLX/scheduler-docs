---
sidebar_label: TIMELINE_second_scale_date
title: "TIMELINE_second_scale_date template"
description: "specifies items of the second X-Axis"
---

# TIMELINE_second_scale_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies items of the second X-Axis

@signature: TIMELINE_second_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.timeline_second_scale_date = function(date){
    var timeline = scheduler.matrix.timeline;
    var func = scheduler.date.date_to_str(
        (timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
    return func(date);
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
