---
sidebar_label: "closeSection"
title: "closeSection method"
description: "Schließt einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht."
---

# closeSection
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Schließt einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht.

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - Die Kennung des Abschnitts, der geschlossen werden soll.

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
 Die Methode erfordert, dass das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Wenn die aktive Ansicht kein Timeline im 'Tree'-Modus ist, hat diese Methode keine Wirkung.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
