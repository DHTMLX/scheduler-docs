---
sidebar_label: deleteSection
title: "deleteSection method"
description: "deletes a section from the currently active view"
---

# deleteSection
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Deletes a section from the currently active view

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (required) *string* - the section's id

### Returns
- ` isSuccess` - (boolean) - returns true, if the section was deleted successfully and false in other cases (e.g. if an incorrect section was specified).

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
}); 
...
scheduler.deleteSection("sales");
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
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)
