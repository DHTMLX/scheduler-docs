---
sidebar_label: "callEvent"
title: "callEvent method"
description: "触发一个内部事件"
---

# callEvent

### Description

@short: 触发一个内部事件

@signature: callEvent: (name: string, params: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - 事件名称，大小写不敏感
- `params` - (required) *array* - 包含与事件相关数据的数组

### Returns
- ` result` - (boolean) - <i>false</i>，如果任一事件处理程序返回了<i>false</i>。否则，返回<i>true</i>

### Example

~~~jsx
scheduler.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

const res = scheduler.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

事件通常会自动触发，因此很少需要使用此方法。

### Related API
- [attachEvent](api/method/attachevent.md)
