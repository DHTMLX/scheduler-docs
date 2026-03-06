---
sidebar_label: "unblockTime"
title: "unblockTime method"
description: "удаляет блокировку, установленную ранее методом blockTime()"
---

# unblockTime
:::warning
Эта функицональность устарела
::: 
### Description

@short: Удаляет блокировку, установленную ранее методом blockTime()

@signature: unblockTime: (days: any, zones?: any[], sections?: any) =\> void

### Parameters

- `days` - (required) *any* - (<i>Date, number, array, string</i>) указывает дни, для которых нужно снять блокировку
- `zones` - (optional) *array* - временные интервалы в минутах, для которых нужно снять блокировку. Может быть задано значение 'fullday' для разблокировки на весь день
- `sections` - (optional) *object* - позволяет снимать блокировку только для конкретных элементов в определённых представлениях. Обратите внимание, что указанные даты будут разблокированы только в соответствующих представлениях

### Example

~~~jsx
var spanId = scheduler.blockTime(new Date(2013,2,5), "fullday");
...
// снимает блокировку с 0 до 8 и с 18 до 24 часов 5 февраля 2013 года
scheduler.unblockTime(new Date(2013,2,5), [0,10*60]);
~~~

### Related API
- [blockTime](api/method/blocktime.md)

### Change log
- deprecated since v5.1
