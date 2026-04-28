---
sidebar_label: mixin
title: "mixin method"
description: "добавляет свойства объекта 'source' в объект 'target'"
---

# mixin

### Description

@short: Добавляет свойства объекта 'source' в объект 'target'

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - целевой объект
- `source` - (required) *object* - исходный объект
- `force` - (required) *boolean* - если true, свойства 'source' перезапишут совпадающие свойства 'target', если таковые имеются. Если false, свойства, которые уже существуют в 'target', будут пропущены

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- добавлено в версии 6.0