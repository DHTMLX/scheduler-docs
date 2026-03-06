---
sidebar_label: "addSection"
title: "addSection method"
description: "fügt der aktuell aktiven Ansicht einen neuen Abschnitt hinzu"
---

# addSection
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Fügt der aktuell aktiven Ansicht einen neuen Abschnitt hinzu

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - das hinzuzufügende Abschnittsobjekt
- `parent_id` - (required) *string* - die ID des übergeordneten Abschnitts; 'null' verwenden, um den Abschnitt auf der Hauptebene hinzuzufügen

### Returns
- ` isSuccess` - (boolean) - gibt 'true' zurück, wenn der Abschnitt erfolgreich hinzugefügt wurde, andernfalls 'false' (z.B. wenn eine ungültige parent_id angegeben wurde)

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

scheduler.addSection( {key:1, label:"James Smith"}, "p1");
scheduler.addSection( {key:2, label:"Alex White"}, "sales");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Methode erfordert, dass das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Wenn die aktuelle Ansicht kein Timeline-Modus mit 'Tree' Rendering ist, hat diese Methode keine Auswirkung.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [deleteAllSections](api/method/deleteallsections.md)
