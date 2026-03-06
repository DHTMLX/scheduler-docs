---
sidebar_label: "onDestroy"
title: "onDestroy event"
description: "срабатывает один раз после очистки планировщика с помощью метода [destructor](api/method/destructor.md)"
---

# onDestroy

### Description

@short: Срабатывает один раз после очистки планировщика с помощью метода [destructor](api/method/destructor.md)

@signature: onDestroy: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDestroy", function(){
   alert("освободить пользовательские ресурсы");
});

scheduler.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

### Change log
- добавлено в версии 6.0
