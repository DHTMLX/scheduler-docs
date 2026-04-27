--- 
sidebar_label: onXLS
title: "onXLS событие"
description: "срабатывает непосредственно перед началом загрузки данных из источника данных"
---

# onXLS
:::warning 
Это событие устарело
:::
### Description

@short: Срабатывает непосредственно перед началом загрузки данных из источника данных

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    // любая ваша логика здесь
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md)

### Change log
- устарело с версии v5.2