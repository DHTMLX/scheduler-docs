---
sidebar_label: year_tooltip
title: "year_tooltip template"
description: "specifies the tooltip over a day cell containing some scheduled event(s)"
---

# year_tooltip

### Description

@short: Specifies the tooltip over a day cell containing some scheduled event(s)

@signature: year_tooltip: (start: Date, end: Date, event: any) =\> string

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.year_tooltip = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 The template requires the [year_view](guides/extensions-list.md#year) plugin to be activated. 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
