---
sidebar_label: callEvent
title: "callEvent method"
description: "вызывает внутреннее событие"
---

# callEvent

### Description

@short: Вызывает внутреннее событие

@signature: callEvent: (name: string, params: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - имя события, без учета регистра
- `params` - (required) *array* - массив данных, связанных с событием

### Returns
- ` result` - (boolean) - <i>false</i>, если некоторые обработчики событий возвращают <i>false</i>. В противном случае, <i>true</i>

### Example

~~~jsx
scheduler.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

const res = scheduler.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Обычно события вызываются автоматически, и вам не нужно использовать этот метод.

### Related API
- [attachEvent](api/method/attachevent.md)