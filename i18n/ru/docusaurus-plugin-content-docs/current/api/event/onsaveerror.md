---
sidebar_label: "onSaveError"
title: "onSaveError event"
description: "срабатывает при возникновении ошибки во время обновления данных"
---

# onSaveError

### Description

@short: Срабатывает при возникновении ошибки во время обновления данных

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - массив, содержащий ID событий, которые не удалось обновить
- `response` - (required) *XMLHttpRequest* - объект Ajax-запроса

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("Не удалось обновить данные");
})
~~~

### Details

:::note

Это событие срабатывает только при использовании библиотеки dataProcessor для клиент-серверного взаимодействия.
 
:::
