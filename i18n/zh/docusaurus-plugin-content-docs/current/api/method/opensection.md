---
sidebar_label: "openSection"
title: "openSection method"
description: "在当前活动视图中打开特定的section（仅当活动视图为'Tree'模式的Timeline时生效；否则该方法将被忽略）"
---

# openSection

### Description

@short: 在当前活动视图中打开特定的section（仅当活动视图为"Tree"模式的Timeline时生效；否则该方法将被忽略）

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - 要打开的section的id

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
 该方法需要启用[treetimeline](guides/extensions-list.md#treetimeline)插件。 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
