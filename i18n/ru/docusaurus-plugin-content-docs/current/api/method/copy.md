---
sidebar_label: копирование
title: "Метод копирования"
description: "создает глубокую копию переданного объекта"
---

# Копирование

### Description

@short: Создает глубокую копию переданного объекта

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (обязательный) *object* - объект, который нужно скопировать

### Returns
- `backupEvent` - (object) - глубокая копия переданного объекта

### Example

~~~jsx
const backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- добавлено в версии 6.0