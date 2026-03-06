---
sidebar_label: "defined"
title: "defined method"
description: "возвращает false, если аргумент равен undefined; возвращает true в остальных случаях"
---

# defined

### Description

@short: Возвращает false, если аргумент равен undefined; возвращает true в остальных случаях

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект, который необходимо проверить

### Returns
- ` state` - (boolean) - false, если аргумент равен undefined, true в противном случае

### Example

~~~jsx
// проверка, определено ли свойство "custom_property" у объекта event
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- added in version 6.0
