---
sidebar_label: onDestroy
title: "Событие onDestroy"
description: "срабатывает после того, как планировщик очищен методом [destructor](api/method/destructor.md)"
---

# onDestroy

### Description

@short: Срабатывает после того, как планировщик очищен методом [destructor](api/method/destructor.md)

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
- добавлено в v6.0