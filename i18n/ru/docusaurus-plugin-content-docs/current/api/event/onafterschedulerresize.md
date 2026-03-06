---
sidebar_label: "onAfterSchedulerResize"
title: "onAfterSchedulerResize event"
description: "срабатывает после того, как размер scheduler был обновлен и область с данными перерисована"
---

# onAfterSchedulerResize

### Description

@short: Срабатывает после того, как размер scheduler был обновлен и область с данными перерисована

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    //любая ваша логика здесь
});
~~~
