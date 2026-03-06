---
sidebar_label: "onXLS"
title: "onXLS event"
description: "срабатывает непосредственно перед началом загрузки источника данных"
---

# onXLS
:::warning
Эта функицональность устарела
::: 
### Description

@short: Срабатывает непосредственно перед началом загрузки источника данных

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    //место для вашей пользовательской логики
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md)

### Change log
- устарело с версии v5.2
