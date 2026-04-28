--- 
sidebar_label: Promise
title: "Метод Promise"
description: "Конструктор объекта Promise"
---

# Promise

### Description

@short: Конструктор объекта Promise

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - колбэк, используемый для инициализации Promise

### Returns
- `promise` - (object) - объект Promise

### Example

~~~jsx
new scheduler.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

Конструктор объекта Promise.

### Change log
- Добавлено в версии v6.0.
- Перешёл с Bluebird на нативный Promise в версии v7.0.