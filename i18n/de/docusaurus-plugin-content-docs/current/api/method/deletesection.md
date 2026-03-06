---
sidebar_label: "deleteSection"
title: "deleteSection method"
description: "entfernt einen Abschnitt aus der aktuell aktiven Ansicht"
---

# deleteSection
:::info
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Entfernt einen Abschnitt aus der aktuell aktiven Ansicht

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (required) *string* - die Kennung des Abschnitts

### Returns
- ` isSuccess` - (boolean) - gibt true zurück, wenn der Abschnitt erfolgreich entfernt wurde, andernfalls false (zum Beispiel, wenn die Abschnitts-ID ungültig ist).

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Produktionsabteilung", children:[
            {key:"p1", label:"Manager", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]}
        ]},
        {key:"sales", label:"Vertrieb und Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
}); 
...
scheduler.deleteSection("sales");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Methode benötigt das aktivierte [treetimeline](guides/extensions-list.md#treetimeline) Plugin. 
:::

:::note

Wenn die aktuelle Ansicht kein Timeline im 'Tree' Modus ist, hat diese Methode keine Wirkung.
 
:::

### Related API
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)
