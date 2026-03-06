---
sidebar_label: TIMELINE_scalex_class
title: "TIMELINE_scalex_class template"
description: "specifies the name of a CSS class that will be applied to items of the X-Axis"
---

# TIMELINE_scalex_class
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the name of a CSS class that will be applied to items of the X-Axis

@signature: TIMELINE_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.timeline_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
