---
sidebar_label: "onOptionsLoadStart"
title: "onOptionsLoadStart event"
description: "срабатывает непосредственно перед началом загрузки набора опций или секций с сервера (применимо только к Timeline view)"
---

# onOptionsLoadStart

### Description

@short: Срабатывает непосредственно перед началом загрузки набора опций или секций с сервера (применимо только к Timeline view)

@signature: onOptionsLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //любая ваша логика здесь
});
~~~

### Details

Это событие происходит исключительно при загрузке коллекции, либо через dhtxmlConnector, либо с использованием метода [updateCollection](api/method/updatecollection.md).
