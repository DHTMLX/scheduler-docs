---
sidebar_label: openSection
title: "openSection method"
description: "открывает указанный раздел в текущем активном представлении (если открытое представление не Timeline в режиме 'Tree' — метод будет проигнорирован)"
---

# openSection

### Description

@short: Открывает указанный раздел в текущем активном представлении (если открытое представление не Timeline в режиме 'Tree' — метод будет проигнорирован)

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - идентификатор раздела

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "timeline",
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
scheduler.openSection("managers");
~~~

**Подходящие представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активации плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)