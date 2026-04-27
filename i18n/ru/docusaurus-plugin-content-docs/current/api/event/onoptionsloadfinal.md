---
sidebar_label: onOptionsLoadFinal
title: "onOptionsLoadFinal событие"
description: "срабатывает после завершения загрузки коллекции options(sections) (только для вида Timeline)"
---

# onOptionsLoadFinal

### Description

@short: Fires after loading of an options(sections) collection is complete (the Timeline view only)

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    //any custom logic here
});
~~~

### Details

Событие срабатывает только тогда, когда коллекция загружается с помощью dhtxmlConnector или через метод [updateCollection](api/method/updatecollection.md).