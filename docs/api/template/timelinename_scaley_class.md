---
sidebar_label: TIMELINE_scaley_class
title: "TIMELINE_scaley_class template"
description: "specifies the name of a CSS class that will be applied to items of the Y-Axis"
---

# TIMELINE_scaley_class
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the name of a CSS class that will be applied to items of the Y-Axis

@signature: TIMELINE_scaley_class: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - the section's id
- `label` - (required) *string* - the section's label
- `section` - (required) *object* - the section object that contains the 'key' and 'label' properties

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
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
