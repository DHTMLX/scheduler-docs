---
sidebar_label: openSection
title: "openSection method"
description: "opens the specified section in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)"
---

# openSection

### Description

@short: Opens the specified section in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - the section's id

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",     label:"Administration", children: [
            {key:1, label:"James Smith"},
            {key:2, label:"John Williams"}
        ]},
        {key:"accounts",     label:"Accounting Department", children: [
            {key:3, label:"David Miller"},
            {key:4, label:"Linda Brown"}           
        ]},
        {key:"sales",         label:"Sales and Marketing"},
        {key:"production",     label:"Production Department"}
    ]
});
...
scheduler.openSection("managers");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The method requires the [treetimeline](guides/extensions-list.md#treetimeline) plugin to be activated. 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
