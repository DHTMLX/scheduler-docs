---
sidebar_label: "closeSection"
title: "closeSection method"
description: "关闭当前活动视图中的指定 section。"
---

# closeSection
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 关闭当前活动视图中的指定 section。

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - 要关闭的 section 的标识符。

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
 该方法需要启用 [treetimeline](guides/extensions-list.md#treetimeline) 插件。 
:::

:::note

如果当前活动视图不是以"Tree"模式渲染的 Timeline，该方法将不会生效。
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
