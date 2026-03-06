---
sidebar_label: "copy"
title: "copy method"
description: "создаёт глубокую копию заданного объекта"
---

# copy

### Description

@short: Создаёт глубокую копию заданного объекта

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (required) *object* - объект, который нужно продублировать

### Returns
- ` backupEvent` - (object) - глубокая копия заданного объекта

### Example

~~~jsx
var backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- added in version 6.0
