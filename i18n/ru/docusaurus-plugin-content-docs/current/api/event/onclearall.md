---
sidebar_label: onClearAll
title: "onClearAll событие"
description: "срабатывает после очистки данных в планировщике"
---

# onClearAll

### Description

@short: Срабатывает после очистки данных в планировщике

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    // любая ваша логика здесь
});
~~~

### Details

Событие вызывается из метода [clearAll](api/method/clearall.md).