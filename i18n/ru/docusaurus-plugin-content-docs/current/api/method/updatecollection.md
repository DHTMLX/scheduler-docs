---
sidebar_label: "updateCollection"
title: "updateCollection method"
description: "обновляет указанную коллекцию новыми опциями"
---

# updateCollection

### Description

@short: Обновляет указанную коллекцию новыми опциями

@signature: updateCollection: (collection: string, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string* - имя коллекции для обновления
- `options` - (required) *array* - новые значения коллекции

### Returns
- ` collection` - (boolean) - <i>true</i>, если обновление прошло успешно; <i>false</i>, если коллекция не найдена

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

- Этот метод вызывает событие [onOptionsLoad](api/event/onoptionsload.md) и обновляет lightbox. 
- Коллекции могут быть изначально созданы с помощью метода [serverList](api/method/serverlist.md).

## Примеры

#### Select control

Рассмотрим lightbox, настроенный следующим образом:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", ...},
    { name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
        map_to: "section_id" },
    { name: "time", ... }
]; 
~~~

С такой настройкой можно обновлять опции в select контроле, изменяя список с именем 'sections'. <br>
Для обновления списка 'sections' можно выполнить следующее:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


#### Units view
Предположим, у вас есть Units view, настроенный так:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

Чтобы изменить список отображаемых юнитов, используйте:

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
