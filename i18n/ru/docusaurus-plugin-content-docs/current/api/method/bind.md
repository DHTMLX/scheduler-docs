---
sidebar_label: "bind"
title: "bind method"
description: "создаёт новую функцию, которая при вызове имеет ключевое слово <i>this</i>, установленное в указанное значение"
---

# bind

### Description

@short: Создаёт новую функцию, которая при вызове имеет ключевое слово <i>this</i>, установленное в указанное значение

@signature: bind: (method: SchedulerCallback, thisArg: any) =\> SchedulerCallback

### Parameters

- `method` - (required) *function* - функция, которую нужно привязать
- `thisArg` - (required) *object* - значение, которое будет использоваться как контекст <i>this</i> при вызове привязанной функции

### Returns
- ` bound_function` - (function) - новая функция, которая при вызове использует указанный контекст <i>this</i> для исходной функции

### Example

~~~jsx
scheduler.bind(method, thisArg);
~~~

### Details

Этот метод служит совместимой с IE8 альтернативой функции [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

### Change log
- добавлено в версии 6.0
