---
sidebar_label: "Promise"
title: "Promise method"
description: "Конструктор для создания объекта Promise"
---

# Promise

### Description

@short: Конструктор для создания объекта Promise

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - функция обратного вызова, которая инициализирует promise

### Returns
- ` promise` - (object) - созданный объект promise

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

Это конструктор для объекта Promise.

### Change log
- Введено в версии v6.0.
- С переходом с Bluebird на нативный Promise в версии v7.0.
