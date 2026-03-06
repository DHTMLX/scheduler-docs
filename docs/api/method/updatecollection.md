---
sidebar_label: updateCollection
title: "updateCollection method"
description: "updates the specified collection with new options"
---

# updateCollection

### Description

@short: Updates the specified collection with new options

@signature: updateCollection: (collection: string, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string* - the name of the collection to update
- `options` - (required) *array* - the new values of the collection

### Returns
- ` collection` - (boolean) - <i>true</i>, if the update was successful; <i>false</i>, if the collection wasn't found

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

- The method calls the [onOptionsLoad](api/event/onoptionsload.md) event and resets the lightbox. 
- The collection can be created with the [serverList](api/method/serverlist.md) method.

## Examples

#### Select control

Let's assume that you have the lightbox as in:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", ...},
    { name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
        map_to: "section_id" },
    { name: "time", ... }
]; 
~~~

With such declaration it would be possible to update options in the select control through the list named 'sections'. <br>
To update the 'sections' list you can use:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


#### Units view
Let's assume that you have the Units view as in:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

To update the list of displayed units you can use:

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
