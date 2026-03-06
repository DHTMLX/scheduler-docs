---
sidebar_label: "onSchedulerReady"
title: "onSchedulerReady event"
description: "срабатывает после завершения инициализации scheduler, хотя он ещё не отображён на странице."
---

# onSchedulerReady

### Description

@short: Срабатывает после завершения инициализации scheduler, хотя он ещё не отображён на странице.

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    //любой кастомный код здесь
});
~~~
