---
sidebar_label: createDataProcessor
title: "createDataProcessor method"
description: "создает новый экземпляр dataProcessor и прикрепляет его к scheduler"
---

# createDataProcessor

### Description

@short: Создает новый экземпляр dataProcessor и прикрепляет его к scheduler

@signature: createDataProcessor: (config: any) =\> any

### Parameters

- `config` - (required) *string | object* - конфигурационный объект dataProcessor

### Returns
- `dataProcessor` - (object) - объект dataProcessor

### Example

~~~jsx
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

### Details

Метод может принимать один из следующих типов параметров:

1\. `{url:string, mode:string}` объект, задающий один из предопределённых режимов отправки данных

~~~js
const dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

где:

- url - URL к серверу
- mode - режим отправки данных на сервер: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. Или объект router:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

где router — либо функция:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - объект с деталями события
// id – id обрабатываемого объекта (события)
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
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

или объектом следующей структуры:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Все функции объекта router должны возвращать либо Promise, либо объект ответа данных. Это необходимо для того, чтобы dataProcessor мог применять идентификатор базы данных и подключать обработчик события **onAfterUpdate** к data processor.

~~~js
router = function(entity, action, data, id) {
    return new scheduler.Promise(function(resolve, reject) {
        // … некоторая логика
        return resolve({tid: databaseId});
     });
}
~~~

Таким образом, вы можете использовать DataProcessor для сохранения данных в localStorage или в любом другом хранилище, не связанном с конкретным URL, или в случае, если существуют два разных сервера (URLs), ответственные за создание и удаление объектов.

### Related Guides
- [Интеграция с серверной стороной](guides/server-integration.md)
