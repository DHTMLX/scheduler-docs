---
sidebar_label: "onBeforeTodayDisplayed"
title: "onBeforeTodayDisplayed event"
description: "срабатывает при нажатии кнопки «Today» в scheduler"
---

# onBeforeTodayDisplayed

### Description

@short: Срабатывает при нажатии кнопки «Today» в scheduler

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться стандартное действие события (<b>true</b>) или оно должно быть предотвращено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    //место для вашей кастомной логики
    return true;
});
~~~
