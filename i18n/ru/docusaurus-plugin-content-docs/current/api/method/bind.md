---
sidebar_label: bind
title: "Метод bind"
description: "создает новую функцию, которая при вызове имеет своё ключевое слово <i>this</i>, установленное в переданное значение"
---

# bind

### Description

@short: Создает новую функцию, которая при вызове имеет своё ключевое слово <i>this</i>, установленное в переданное значение

@signature: bind: (method: SchedulerCallback, thisArg: any) =\> SchedulerCallback

### Parameters

- `method` - (required) *function* - целевая функция
- `thisArg` - (required) *object* - значение, которое будет передано в качестве параметра <i>this</i> целевой функции при вызове привязанной функции

### Returns
- ` bound_function` - (function) - новая функция, которая при вызове имеет значение <i>this</i>, передаваемое целевой функции

### Example

~~~jsx
scheduler.bind(method, thisArg);
~~~

### Details

Метод используется как IE8 совместимая замена функции Function.prototype.bind().

### Change log
- добавлено в версии 6.0