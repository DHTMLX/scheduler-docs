---
sidebar_label: deleteAllSections
title: "deleteAllSections method"
description: "deletes all sections from the currently active view"
---

# deleteAllSections
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Deletes all sections from the currently active view

@signature: deleteAllSections: () =\> void

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"Administration"},
        {key:"accounts",    label:"Accounting Department"},
        {key:"sales",       label:"Sales and Marketing"},
        {key:"production",  label:"Production Department"}
    ]
});
...
scheduler.deleteAllSections();
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
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)
