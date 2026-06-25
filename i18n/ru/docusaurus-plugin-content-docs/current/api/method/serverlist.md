---
sidebar_label: serverList
title: "Метод serverList"
description: "определяет именованную коллекцию, которую можно загрузить в Units, Timeline-представления или Lightbox"
---

# serverList

### Description

@short: Определяет именованную коллекцию, которую можно загрузить в Units, Timeline-представления или Lightbox

@signature: serverList: (list_name: string, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string* - имя списка
- `options` - (optional) *array* - необязательный массив опций

### Returns
- ` list` - (array) - список опций

### Example

~~~jsx
// получает список опций по имени 'my_list'
const list = scheduler.serverList("my_list"); 
...
// создаёт и возвращает список с указанными опциями
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

- Если метод вызывается только с первым параметром, метод вернёт список с указанным именем (если он существует).
- Если метод вызывается с двумя параметрами, планировщик создаст список с указанным именем или, если список с таким именем уже существует, планировщик перезапишет его

Списки, созданные этим методом, затем можно обновлять с помощью метода [updateCollection](api/method/updatecollection.md).

Вот почему, если возникает необходимость обновлять коллекции, например варианты选-выбора, список секций в Timeline, представление Units, имеет смысл создавать их как именованный список опций.

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
// аналогично, используя список "units"
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

Позже можно обновить опции везде с помощью метода [scheduler.updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)