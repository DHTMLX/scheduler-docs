---
sidebar_label: onSaveError
title: "Событие onSaveError"
description: "Срабатывает при возникновении ошибки во время обновления данных"
---

# onSaveError

### Description

@short: Срабатывает в случае возникновения ошибки во время обновления данных

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - массив идентификаторов событий, обновление которых не удалось
- `response` - (required) *XMLHttpRequest* - объект Ajax-запроса

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("Не удалось обновить данные");
})
~~~

### Details

:::note

Событие будет вызвано только в том случае, если вы используете библиотеку dataProcessor для обмена данными между клиентом и сервером.

:::