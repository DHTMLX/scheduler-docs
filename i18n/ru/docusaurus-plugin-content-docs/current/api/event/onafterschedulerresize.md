---
sidebar_label: onAfterSchedulerResize
title: "событие onAfterSchedulerResize"
description: "срабатывает после того, как scheduler изменил размер и область данных была перерисована"
---

# onAfterSchedulerResize

### Description

@short: Срабатывает после того, как scheduler изменил размер и область данных была перерисована

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    // любая ваша логика здесь
});
~~~