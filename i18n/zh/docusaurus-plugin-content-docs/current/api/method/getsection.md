---
sidebar_label: "getSection"
title: "getSection method"
description: "获取当前活动视图中特定 section 的对象"
---

# getSection
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 获取当前活动视图中特定 section 的对象

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - section 的标识符

### Returns
- ` section` - (object) - section 对象

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
 此方法仅在启用 [treetimeline](guides/extensions-list.md#treetimeline) 插件时有效。 
:::

:::note
  
如果当前视图不是"Tree"模式的 Timeline，此方法将无效。 
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
