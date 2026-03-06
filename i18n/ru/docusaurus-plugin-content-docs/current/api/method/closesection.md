---
sidebar_label: "closeSection"
title: "closeSection method"
description: "Закрывает конкретный section внутри текущего активного view."
---

# closeSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Закрывает конкретный section внутри текущего активного view.

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - Идентификатор section, который нужно закрыть.

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
 Метод требует включенного плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если активный view не является Timeline в режиме 'Tree', этот метод не окажет никакого эффекта.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
