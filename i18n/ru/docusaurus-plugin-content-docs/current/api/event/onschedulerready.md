---
sidebar_label: onSchedulerReady
title: "Событие onSchedulerReady"
description: "срабатывает после завершения инициализации планировщика, но планировщик еще не отрисован на странице."
---

# onSchedulerReady

### Description

@short: Срабатывает после завершения инициализации планировщика, но планировщик еще не отрисован на странице.

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    // любая ваша логика здесь
});
~~~