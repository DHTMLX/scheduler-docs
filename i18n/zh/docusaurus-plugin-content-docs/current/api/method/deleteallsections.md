---
sidebar_label: "deleteAllSections"
title: "deleteAllSections method"
description: "从当前活动视图中移除所有 section"
---

# deleteAllSections
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 从当前活动视图中移除所有 section

@signature: deleteAllSections: () =\> void

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"管理部门"},
        {key:"accounts",    label:"财务部门"},
        {key:"sales",       label:"销售和市场部"},
        {key:"production",  label:"生产部门"}
    ]
});
...
scheduler.deleteAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该方法需要激活 [treetimeline](guides/extensions-list.md#treetimeline) 插件。 
:::

:::note

如果当前视图不是使用"Tree"渲染的 Timeline，该方法将无效。
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)
