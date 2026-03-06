---
sidebar_label: "onLoadError"
title: "onLoadError event"
description: "вызывается, когда scheduler не может распарсить данные или когда сервер возвращает статус 4xx или 5xx"
---

# onLoadError

### Description

@short: Вызывается, когда scheduler не может распарсить данные или когда сервер возвращает статус 4xx или 5xx

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - объект Ajax-запроса

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("Не удалось загрузить данные");
});
~~~

### Details

Это событие вызывается методами [parse](api/method/parse.md) и [load](api/method/load.md).

Когда событие срабатывает в результате вызова метода **parse**, функция-обработчик получает объект с свойством *responseText*, содержащим данные для парсинга:

~~~js
{
    responseText: parseArgument
}
~~~
