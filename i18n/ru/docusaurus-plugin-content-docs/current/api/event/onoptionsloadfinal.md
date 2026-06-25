---
sidebar_label: onOptionsLoadFinal
title: "onOptionsLoadFinal событие"
description: "срабатывает после завершения загрузки коллекции options(sections) (только для вида Timeline)"
---

# onOptionsLoadFinal

### Description

@short: Срабатывает один раз после завершения загрузки коллекции опций (секций) (применимо только к Timeline view)

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    //здесь можно разместить кастомную логику
});
~~~

### Details

Событие срабатывает только тогда, когда коллекция загружается с помощью dhtxmlConnector или через метод [updateCollection](api/method/updatecollection.md).