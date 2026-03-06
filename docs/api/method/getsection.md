---
sidebar_label: getSection
title: "getSection method"
description: "gets the object of the specified section in the currently active view"
---

# getSection
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Gets the object of the specified section in the currently active view

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - the section's id

### Returns
- ` section` - (object) - the section object

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",     label:"Administration"},
        {key:"accounts",     label:"Accounting Department"},
        {key:"sales",         label:"Sales and Marketing"},
        {key:"production",     label:"Production Department"}
    ]
});
...
scheduler.getSection("sales");//->{key:"sales",label:"Sales and Marketing"}
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
