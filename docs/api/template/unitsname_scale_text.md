---
sidebar_label: UNITS_scale_text
title: "UNITS_scale_text template"
description: "specifies items of the X-Axis"
---

# UNITS_scale_text
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies items of the X-Axis

@signature: UNITS_scale_text: (key: string, label: string, unit: object, date: Date) =\> string;

### Parameters

- `key` - (required) *string* - the unit's id (key)
- `label` - (required) *string* - the unit's label
- `unit` - (required) *object* - the unit object containing the 'key' and 'label' properties
- `date` - (required) *Date* - the date of a column (for multi-day Units view)

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
    if (option.css) {
        return "<span class='" + option.css + "'>" + label + "</span>";
    } else {
        return label;
    }
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 The template requires the [units](guides/extensions-list.md#units) plugin to be activated. 
:::

### Related Guides
- [Units View Templates](views/units-view-templates.md)
