---
sidebar_label: "deleteAllSections"
title: "deleteAllSections method"
description: "удаляет все секции из активного вида"
---

# deleteAllSections
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Удаляет все секции из активного вида

@signature: deleteAllSections: () =\> void

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"Administration"},
        {key:"accounts",    label:"Accounting Department"},
        {key:"sales",       label:"Sales and Marketing"},
        {key:"production",  label:"Production Department"}
    ]
});
...
scheduler.deleteAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активации плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если текущий вид не является Timeline с рендерингом 'Tree', этот метод не будет иметь эффекта.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)
