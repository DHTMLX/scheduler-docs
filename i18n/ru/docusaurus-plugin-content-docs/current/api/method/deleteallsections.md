---
sidebar_label: deleteAllSections
title: "deleteAllSections метод"
description: "удаляет все секции из текущего активного представления"
---

# deleteAllSections
:::info
 Эта функциональность доступна только в версии PRO. 
:::
### Description

@short: Удаляет все секции из текущего активного представления

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

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Методы требуется активировать плагин [treetimeline](guides/extensions-list.md#treetimeline).
 :::

:::note

Если открытое представление не является Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)