---
sidebar_label: onBeforeTodayDisplayed
title: "onBeforeTodayDisplayed событие"
description: "срабатывает, когда пользователь нажимает кнопку «Сегодня» в планировщике"
---

# onBeforeTodayDisplayed

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «Сегодня» в планировщике

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    // любая ваша логика здесь
    return true;
});
~~~