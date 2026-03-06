---
sidebar_label: addSection
title: "addSection method"
description: "adds a section to the currently active view"
---

# addSection

:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Adds a section to the currently active view

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - the object of the section to add
- `parent_id` - (required) *string* - the id of the parent section. Pass 'null' if you are adding a section to the root

### Returns
- ` isSuccess` - (boolean) - returns 'true', if the section was added successfully and 'false' in other cases (e.g. incorrect parent_id was specified).

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

scheduler.addSection( {key:1, label:"James Smith"}, "p1");
scheduler.addSection( {key:2, label:"Alex White"}, "sales");
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
- [deleteAllSections](api/method/deleteallsections.md)
