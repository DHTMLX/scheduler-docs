---
sidebar_label: TIMELINE_row_class
title: "TIMELINE_row_class template"
description: "specifies the CSS class that will be applied to a row of the Timeline view"
---

# TIMELINE_row_class
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the CSS class that will be applied to a row of the Timeline view

@signature: TIMELINE_row_class: (section: object, timeline: object) =\> string;

### Parameters

- `section` - (required) *object* - the section object
- `timeline` - (required) *object* - the timeline object

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.timeline_row_class = function(section, timeline){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

The default value of the template is:

~~~js
scheduler.templates.TIMELINE_row_class = function(section, timeline){
    if(timeline.folder_events_available && section.children){
        return "folder";
    }
    return "";
};
~~~

### Related API
- [`TIMELINE_cell_class`](api/template/timelinename_cell_class.md)
- [`TIMELINE_cell_value`](api/template/timelinename_cell_value.md)

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)

### Change log
- added in v5.3.9
