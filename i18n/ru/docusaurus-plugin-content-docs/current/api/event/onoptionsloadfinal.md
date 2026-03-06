---
sidebar_label: "onOptionsLoadFinal"
title: "onOptionsLoadFinal event"
description: "срабатывает один раз после завершения загрузки коллекции опций (секций) (применимо только к Timeline view)"
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

Это событие возникает исключительно при загрузке коллекции через dhtxmlConnector или при использовании метода [updateCollection](api/method/updatecollection.md).
