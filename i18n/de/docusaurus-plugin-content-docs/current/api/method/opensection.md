---
sidebar_label: "openSection"
title: "openSection method"
description: "öffnet einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht (funktioniert nur, wenn die aktive Ansicht eine Timeline im 'Tree'-Modus ist; andernfalls wird die Methode ignoriert)"
---

# openSection

### Description

@short: Öffnet einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht (funktioniert nur, wenn die aktive Ansicht eine Timeline im 'Tree'-Modus ist; andernfalls wird die Methode ignoriert)

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - die ID des zu öffnenden Abschnitts

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
        {key:"accounts",     label:"Buchhaltungsabteilung", children: [
            {key:3, label:"David Miller"},
            {key:4, label:"Linda Brown"}           
        ]},
        {key:"sales",         label:"Vertrieb und Marketing"},
        {key:"production",     label:"Produktionsabteilung"}
    ]
});
...
scheduler.openSection("managers");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Methode erfordert, dass das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
