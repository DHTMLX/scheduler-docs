---
sidebar_label: "getSection"
title: "getSection method"
description: "holt das Objekt für einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht"
---

# getSection

### Description

@short: Holt das Objekt für einen bestimmten Abschnitt innerhalb der aktuell aktiven Ansicht

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - die Kennung des Abschnitts

### Returns
- ` section` - (object) - das Abschnittsobjekt

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
 Dieses Feature ist nur in der PRO-Edition enthalten. 
:::

:::note
 Die Methode funktioniert nur, wenn das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Wenn die aktuelle Ansicht nicht die Timeline im 'Tree'-Modus ist, hat diese Methode keine Wirkung.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
