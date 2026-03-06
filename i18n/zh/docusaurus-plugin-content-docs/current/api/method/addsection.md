---
sidebar_label: "addSection"
title: "addSection method"
description: "向当前活动视图添加一个新的 section"
---

# addSection
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 向当前活动视图添加一个新的 section

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - 要添加的 section 对象
- `parent_id` - (required) *string* - 父 section 的 id；使用 'null' 将 section 添加到根级别

### Returns
- ` isSuccess` - (boolean) - 如果 section 成功添加则返回 'true'，否则返回 'false'（例如，如果提供了无效的 parent_id）

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"生产部门", children:[
            {key:"p1", label:"经理们", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]}
        ]},
        {key:"sales", label:"销售与市场", children:[
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
 该方法需要启用 [treetimeline](guides/extensions-list.md#treetimeline) 插件。 
:::

:::note

如果当前视图不是"Tree"模式下的 Timeline，此方法将不起作用。
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [deleteAllSections](api/method/deleteallsections.md)
