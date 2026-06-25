---
sidebar_label: "serverList"
title: "serverList method"
description: "definiert eine benannte Sammlung, die in Units, Timeline-Ansichten oder der Lightbox geladen werden kann"
---

# serverList

### Description

@short: Definiert eine benannte Sammlung, die in Units, Timeline-Ansichten oder der Lightbox geladen werden kann

@signature: serverList: (list_name: string, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string* - der Name einer Liste  
- `options` - (optional) *array* - optionale, ein Array von Optionen

### Returns
- ` list` - (array) - eine Liste von Optionen

### Example

~~~jsx
// ruft eine Liste von Optionen mit dem Namen 'my_list' ab  
const list = scheduler.serverList("my_list");  
...  
// erstellt und gibt eine Liste mit den angegebenen Optionen zurück  
const list = scheduler.serverList("options", [  
    {key: 1, label: "John"},  
    {key: 2, label: "Adam"},  
    {key: 3, label: "Diane"}  
]);
~~~

### Related samples
- [Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

- Wenn die Methode nur mit dem ersten Parameter aufgerufen wird, gibt sie die mit diesem Namen verknüpfte Liste zurück, falls diese existiert.  
- Wenn die Methode mit zwei Parametern aufgerufen wird, erstellt sie eine neue Liste mit dem angegebenen Namen oder überschreibt die bestehende, falls bereits eine Liste mit diesem Namen vorhanden ist.

Listen, die über diese Methode erstellt wurden, können später mit der Methode [scheduler.updateCollection](api/method/updatecollection.md) aktualisiert werden.

Für Szenarien, in denen Sammlungen wie Auswahloptionen oder Listen von Units in der Timeline- oder Units-Ansicht aktualisiert werden müssen, ist es praktisch, diese als benannte Listen von Optionen zu definieren.

~~~js
scheduler.serverList("sections", [
    { key: 1, label: "Section A" },
    { key: 2, label: "Section B" },
    { key: 3, label: "Section C" },
    { key: 4, label: "Section D" }
]);

scheduler.config.lightbox.sections = [
    { 
        name: "description", height: 130, map_to: "text", type: "textarea", 
          focus: true 
    },
    { 
        name: "sections", type: "select",
          options: scheduler.serverList("sections"), map_to: "section_id"  /*!*/
    },
    { 
        name: "time", height: 72, type: "time", map_to: "auto" 
    }
]; 
...
// ähnlich mit der "units"-Liste
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections") /*!*/ 
});

scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    y_unit: scheduler.serverList("sections"), /*!*/
    y_property: "section_id",
    render: "bar"
});

scheduler.init("scheduler_here", new Date(), "unit");
~~~

Später ist es möglich, die Optionen überall mit der Methode [scheduler.updateCollection](api/method/updatecollection.md) zu aktualisieren:

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)
