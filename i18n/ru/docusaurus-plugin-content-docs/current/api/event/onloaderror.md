---
sidebar_label: onLoadError
title: "Событие onLoadError"
description: "Вызывается, если планировщик не смог распарсить данные, или если сервер вернул статус ответа 4xx или 5xx"
---

# onLoadError

### Description

@short: Вызывается, если планировщик не смог распарсить данные, или если сервер вернул статус ответа 4xx или 5xx

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - объект Ajax-запроса

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("Failed to load data");
});
~~~

### Details

Событие вызывается методами [parse](api/method/parse.md) и [load](api/method/load.md).

В случае вызова события методом **parse** обработчик принимает в качестве параметра объект со свойством *responseText*, которое будет содержать данные, подлежащие разбору, в качестве значения:

~~~js
{
    responseText: parseArgument
}
~~~