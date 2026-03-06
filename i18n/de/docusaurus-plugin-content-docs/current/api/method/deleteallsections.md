---
sidebar_label: "deleteAllSections"
title: "deleteAllSections method"
description: "entfernt alle Sections aus der aktiven Ansicht"
---

# deleteAllSections
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Entfernt alle Sections aus der aktiven Ansicht

@signature: deleteAllSections: () =\> void

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"Administration"},
        {key:"accounts",    label:"Buchhaltungsabteilung"},
        {key:"sales",       label:"Vertrieb und Marketing"},
        {key:"production",  label:"Produktionsabteilung"}
    ]
});
...
scheduler.deleteAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Methode erfordert, dass das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Wenn die aktuelle Ansicht keine Timeline mit 'Tree'-Rendering ist, hat diese Methode keine Wirkung.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)
