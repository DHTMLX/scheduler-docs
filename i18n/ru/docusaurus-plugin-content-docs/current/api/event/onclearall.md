---
sidebar_label: "onClearAll"
title: "onClearAll event"
description: "срабатывает один раз после очистки данных планировщика"
---

# onClearAll

### Description

@short: Срабатывает один раз после очистки данных планировщика

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    //любая ваша логика здесь
});
~~~

### Details

Это событие вызывается из метода [clearAll](api/method/clearall.md).
