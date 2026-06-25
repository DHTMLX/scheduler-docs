---
sidebar_label: onOptionsLoadStart
title: "onOptionsLoadStart событие"
description: "срабатывает перед загрузкой коллекции опций или разделов с сервера (вид таймлайн только)"
---

# onOptionsLoadStart

### Description

@short: Срабатывает перед тем, как коллекция опций или разделов начнет загружаться с сервера (вид таймлайн только)

@signature: onOptionsLoadStart: () => void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //any custom logic here
});
~~~

### Details

Событие срабатывает только когда коллекция загружается с помощью dhtxmlConnector или через метод [updateCollection](api/method/updatecollection.md).