---
sidebar_label: "ajax"
title: "ajax config"
description: "модуль ajax для scheduler"
---

# ajax

### Description

@short: Модуль ajax для scheduler

@signature: ajax: any

### Example

~~~jsx
// предположим, что ответ следующий
{status: "ok", data: "value", data2: "value2"}


var xhr = scheduler.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // ответ в порядке
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // ответ в порядке
    }
});
~~~

### Details

## API Reference

Все методы принимают параметры в одном из двух форматов:

1) Объект RequestConfig, который содержит настройки запроса и выглядит так:

~~~js
{
    url: string,
      method: "PUT|GET|POST|DELETE",
      data: string | object,
      async: true|false,
      callback: function,
      headers: object
}
~~~

Значения свойств:

- url - URL сервера
- method - необязательно, HTTP метод, по умолчанию "GET"
- data - необязательно, данные, отправляемые с запросом; POST и PUT принимают строку или объект
- async - необязательно, асинхронный ли запрос, по умолчанию true
- callback - необязательно, функция, вызываемая после получения ответа
- headers - необязательно, объект с заголовками в формате "ключ":"значение" для включения в запрос

или:

2) Три отдельных параметра (кроме метода **query()**, который принимает только объект *RequestConfig*):

- url - URL сервера
- data - необязательно, данные, отправляемые с запросом
- callback - необязательно, функция, вызываемая после получения ответа

Ниже приведён список методов, доступных в API модуля ajax:

#### Опции callback

Все методы поддерживают как callback, так и [promises](#promises) для обработки ответов.

Промис ajax резолвится с завершённым объектом XmlHttpRequest:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

Для обратной совместимости callback получает ответ в немного другом формате:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    },
    callback: function(result){
           var response = result.xmlDoc;
       
           alert(response.responseText);
    }
});
~~~


#### query

Общий метод для отправки запросов. Может обрабатывать любой тип запроса, указывая метод в параметрах.

~~~js
scheduler.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

Отправляет GET-запрос.

~~~js
scheduler.ajax.get("some.php", function(){
    // ваш код здесь
});
// или
scheduler.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

Отправляет PUT-запрос.

~~~js
scheduler.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // ваш код здесь
});
// или
scheduler.ajax.put({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

#### del

Отправляет DELETE-запрос.

~~~js
scheduler.ajax.del("server.php", function(){
    // ваш код здесь
});
// или
scheduler.ajax.del({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### post

Отправляет POST-запрос.

~~~js
scheduler.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // ваш код здесь
});
// или
scheduler.ajax.post({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

## Отправка данных с методами POST/PUT 

При использовании **post** или **put** можно передать объект вместо строки в data. Модуль ajax автоматически сериализует объект. 
Простые объекты сериализуются как form data (например, &param=value), а вложенные структуры сериализуются с помощью JSON.stringify().

Например, объект:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

будет преобразован в строку вида `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`.

### Promises {#promises}

dhtmlxScheduler поддерживает promises (включая IE8+). Внутри используется библиотека [Bluebird](https://github.com/petkaantonov/bluebird) для работы с промисами. 
Для создания промиса используйте:

~~~js
var promise = new scheduler.Promise(function(resolve, reject) {...});
~~~

Реализация промисов находится внутри Scheduler, поэтому не глобальна.

Модуль AJAX возвращает промисы, позволяя использовать синтаксис промисов вместо callback. Например, вместо

~~~js
scheduler.ajax.post(url, params, callback);
~~~

можно написать

~~~js
scheduler.ajax.post(url, params).then(function(){…});
~~~

Callback и promises можно использовать вместе.

Пример отправки нескольких запросов одновременно и последующей перезагрузки данных после их завершения:

~~~js 
scheduler.Promise.all([
      scheduler.ajax.post({url: "api/event", data: event1}),
      scheduler.ajax.post({url: "api/event", data: event2}),
      scheduler.ajax.post({url: "api/event", data: event3})
]).then(function(){
       scheduler.clearAll();
       scheduler.load("/api");
});
~~~

### Change log
- added in version 6.0
