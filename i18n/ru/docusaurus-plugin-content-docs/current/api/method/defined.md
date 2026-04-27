---
sidebar_label: defined
title: "defined method"
description: "возвращает false, если переданный аргумент является undefined, иначе true"
---

# defined

### Description

@short: Возвращает false, если переданный аргумент является undefined, иначе true

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект, который должен быть проверен

### Returns
- ` state` - (boolean) - false, если переданный аргумент равен undefined, иначе true

### Example

~~~jsx
// проверка, определено ли свойство "custom_property" у объекта event
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- добавлено в версии 6.0