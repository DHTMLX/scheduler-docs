---
sidebar_label: "openSection"
title: "openSection method"
description: "открывает определённый section внутри текущего активного view (работает только если активный view - Timeline в режиме 'Tree'; в противном случае метод игнорируется)"
---

# openSection

### Description

@short: Открывает определённый section внутри текущего активного view (работает только если активный view - Timeline в режиме 'Tree'; в противном случае метод игнорируется)

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - id секции, которую необходимо открыть

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

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует включения плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
