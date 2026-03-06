---
sidebar_label: "onXLE"
title: "onXLE event"
description: "срабатывает один раз после завершения загрузки данных из источника данных"
---

# onXLE
:::warning
Эта функицональность устарела
::: 
### Description

@short: Срабатывает один раз после завершения загрузки данных из источника данных

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    // здесь можно разместить вашу пользовательскую логику
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md)

### Change log
- deprecated с версии v5.2
