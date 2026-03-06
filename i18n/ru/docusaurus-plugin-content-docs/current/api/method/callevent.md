---
sidebar_label: "callEvent"
title: "callEvent method"
description: "триггерит внутреннее событие"
---

# callEvent

### Description

@short: Триггерит внутреннее событие

@signature: callEvent: (name: string, params: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - имя события, без учёта регистра
- `params` - (required) *array* - массив, содержащий данные, связанные с событием

### Returns
- ` result` - (boolean) - <i>false</i>, если любой из обработчиков события возвращает <i>false</i>. В противном случае - <i>true</i>

### Example

~~~jsx
scheduler.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = scheduler.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

События обычно срабатывают автоматически, поэтому использование этого метода требуется редко.

### Related API
- [attachEvent](api/method/attachevent.md)
