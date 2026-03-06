---
sidebar_label: closeSection
title: "closeSection method"
description: "closes the specified section in the currently active view"
---

# closeSection
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Closes the specified section in the currently active view

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - the section's id

### Example

~~~jsx
scheduler.createTimelineView({
    name:"timeline",
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
scheduler.closeSection("managers");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The method requires the [treetimeline](guides/extensions-list.md#treetimeline) plugin to be activated. 
:::

:::note

If the opened view isn't Timeline in the 'Tree' mode, the method will be ignored.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
