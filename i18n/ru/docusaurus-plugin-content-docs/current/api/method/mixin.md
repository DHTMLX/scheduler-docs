---
sidebar_label: "mixin"
title: "mixin method"
description: "сливает свойства из объекта 'source' в объект 'target'"
---

# mixin

### Description

@short: Сливает свойства из объекта 'source' в объект 'target'

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - объект, который будет получать новые свойства
- `source` - (required) *object* - объект, предоставляющий свойства для добавления
- `force` - (required) *boolean* - если true, свойства из 'source' заменят существующие в 'target'; если false, существующие свойства 'target' останутся без изменений

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- добавлено в версии 6.0
