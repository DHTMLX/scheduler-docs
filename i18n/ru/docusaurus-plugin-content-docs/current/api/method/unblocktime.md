---
sidebar_label: unblockTime
title: "unblockTime метод"
description: "удаляет блокировку, установленную методом blockTime()"
---

# unblockTime
:::warning 
Метод устарел.
:::
### Description

@short: Удаляет блокировку, установленную методом blockTime()

@signature: unblockTime: (days: any, zones?: any[], sections?: any) =\> void

### Parameters

- `days` - (required) *any* - (<i>Date, number,array, string</i>) дни, которые следует ограничить
- `zones` - (optional) *array* - период в минутах, который должен быть ограничен. Может быть установлен в значение 'fullday' <br> чтобы ограничить весь день
- `sections` - (optional) *object* - позволяет блокировать даты только для конкретных элементов конкретных представлений. Кстати, указанные даты будут заблокированы только в соответствующих представлениях

### Example

~~~jsx
const spanId = scheduler.blockTime(new Date(2027,2,5), "fullday");
...
// снимает блокировку с 0 до 8 и с 18 до 24 часов 5 февраля 2027 года
scheduler.unblockTime(new Date(2027,2,5), [0,10*60]);
~~~

### Related API
- [blockTime](api/method/blocktime.md)

### Change log
- устарел(а) с версии v5.1