---
sidebar_label: "unblockTime"
title: "unblockTime method"
description: "entfernt eine zuvor mit der Methode blockTime() gesetzte Sperre"
---

# unblockTime
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Entfernt eine zuvor mit der Methode blockTime() gesetzte Sperre

@signature: unblockTime: (days: any, zones?: any[], sections?: any) =\> void

### Parameters

- `days` - (required) *any* - (<i>Date, number, array, string</i>) gibt die Tage an, die entsperrt werden sollen  
- `zones` - (optional) *array* - die Zeiträume in Minuten, die entsperrt werden sollen. Kann auf 'fullday' gesetzt werden, um den gesamten Tag freizugeben  
- `sections` - (optional) *object* - ermöglicht das Entsperren von Datum(en) nur für bestimmte Items in bestimmten Views. Beachten Sie, dass die angegebenen Datum(en) nur in den zugehörigen Views entsperrt werden

### Example

~~~jsx
const spanId = scheduler.blockTime(new Date(2027,2,5), "fullday");  
...  
// entfernt die Sperre von 0 bis 8 und von 18 bis 24 Uhr am 5. Februar 2027  
scheduler.unblockTime(new Date(2027,2,5), [0,10*60]);
~~~

### Related API
- [blockTime](api/method/blocktime.md)

### Change log
- deprecated seit Version 5.1
