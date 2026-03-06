---
sidebar_label: "getSection"
title: "getSection method"
description: "получает объект для конкретного section внутри текущего активного view"
---

# getSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Получает объект для конкретного section внутри текущего активного view

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - идентификатор section

### Returns
- ` section` - (object) - объект section

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
 Метод работает только если включён плагин [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если текущий view не является Timeline в режиме 'Tree', этот метод не будет иметь эффекта.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
