---
sidebar_label: onXLE
title: "onXLE событие"
description: "срабатывает после завершения загрузки данных из источника данных"
---

# onXLE
:::warning 
Это устаревшее событие
:::
### Description

@short: Срабатывает после завершения загрузки данных из источника данных

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    // любая ваша логика здесь
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- [Loading Data](guides/loading-data.md)

### Change log
- устарело с версии v5.2