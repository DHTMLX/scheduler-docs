---
sidebar_label: "createDataProcessor"
title: "createDataProcessor method"
description: "создает новый экземпляр dataProcessor и связывает его с scheduler"
---

# createDataProcessor

### Description

@short: Создает новый экземпляр dataProcessor и связывает его с scheduler

@signature: createDataProcessor: (config: any) =\> any

### Parameters

- `config` - (required) *string | object* - объект конфигурации для dataProcessor

### Returns
- ` dataProcessor` - (object) - созданный экземпляр dataProcessor

### Example

~~~jsx
var dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

### Details

Этот метод принимает один из следующих типов параметров:

1\. Объект с `{url:string, mode:string}`, указывающий предопределенный способ отправки данных

~~~js
var dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

где:

- url - конечная точка сервера
- mode - метод отправки данных: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. В качестве альтернативы можно передать кастомный router объект:

~~~js
var dp = scheduler.createDataProcessor(router);
~~~

Здесь router может быть функцией:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - объект с деталями события
// id – id обрабатываемого объекта (события)
var dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                server + "/" + entity,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                server + "/" + entity + "/" + id
               );
        break;
       }
});
~~~

или объектом со структурой:

~~~js
var dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Каждая функция в router объекте должна возвращать либо Promise, либо объект с ответом данных. Это позволяет dataProcessor обновлять id в базе данных и подключать событие **onAfterUpdate**.

~~~js
router = function(entity, action, data, id) {
    return new scheduler.Promise(function(resolve, reject) {
        // … некоторая логика
        return resolve({tid: databaseId});
     });
}
~~~

Такая гибкость позволяет DataProcessor обрабатывать сохранение данных в localStorage или других типах хранилищ, не привязанных к конкретному URL, или когда разные серверы (URL) управляют операциями создания и удаления.

### Related Guides
- [Интеграция с серверной стороной](guides/server-integration.md)
