---
sidebar_label: closeSection
title: "closeSection method"
description: "Закрывает конкретный section внутри текущего активного view."
---

# closeSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Закрывает указанный раздел в текущем активном представлении

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (обязательный) *string* - идентификатор раздела

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

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Для использования метода требуется активировать плагин [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если открытое представление не является Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)