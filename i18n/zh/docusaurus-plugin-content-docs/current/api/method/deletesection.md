---
sidebar_label: "deleteSection"
title: "deleteSection method"
description: "从当前活动视图中移除一个 section"
---

# deleteSection
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 从当前活动视图中移除一个 section

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (required) *string* - section 的标识符

### Returns
- ` isSuccess` - (boolean) - 如果成功移除 section 则返回 true，否则返回 false（例如，section ID 无效时）。

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"生产部门", children:[
            {key:"p1", label:"经理组", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]}
        ]},
        {key:"sales", label:"销售与市场部", children:[
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
 该方法需要启用 [treetimeline](guides/extensions-list.md#treetimeline) 插件。 
:::

:::note

如果当前视图不是以"Tree"模式的 Timeline，该方法将无效。
 
:::

### Related API
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)
