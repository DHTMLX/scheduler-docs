---
sidebar_label: "updateCollection"
title: "updateCollection method"
description: "aktualisiert die angegebene Collection mit neuen Optionen"
---

# updateCollection

### Description

@short: Aktualisiert die angegebene Collection mit neuen Optionen

@signature: updateCollection: (collection: string, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string* - der Name der zu aktualisierenden Collection
- `options` - (required) *array* - die neuen Werte der Collection

### Returns
- ` collection` - (boolean) - <i>true</i>, wenn die Aktualisierung erfolgreich war; <i>false</i>, wenn die Collection nicht gefunden wurde

### Example

~~~jsx
scheduler.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"items", height:23, type:"select", 
    options:scheduler.serverList("goods", goods_array), map_to:"section_id" }, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

### Details

- Diese Methode löst das Event [onOptionsLoad](api/event/onoptionsload.md) aus und aktualisiert das Lightbox-Interface. 
- Collections können initial mit der Methode [serverList](api/method/serverlist.md) erstellt werden.

## Beispiele

#### Select-Steuerelement

Betrachten Sie ein Lightbox-Setup wie folgt:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", ...},
    { name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
        map_to: "section_id" },
    { name: "time", ... }
]; 
~~~

Mit dieser Konfiguration ist es möglich, die Optionen im select-Steuerelement durch Ändern der Liste mit dem Namen 'sections' zu aktualisieren. <br>
Um die Liste 'sections' zu aktualisieren, können Sie Folgendes tun:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


#### Units-Ansicht
Angenommen, Sie haben eine Units-Ansicht wie folgt konfiguriert:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

Um die angezeigte Liste der Units zu ändern, können Sie verwenden:

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)
