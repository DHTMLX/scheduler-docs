---
sidebar_label: "onBeforeQuickInfo"
title: "onBeforeQuickInfo event"
description: "срабатывает непосредственно перед появлением всплывающей подсказки Quick Info для события"
---

# onBeforeQuickInfo

### Description

@short: Срабатывает непосредственно перед появлением всплывающей подсказки Quick Info для события

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (required) *string | number* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onBeforeQuickInfo", function(id) {
   if(scheduler.getEvent(id).readonly){
       return false;
   }
   
   return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат false остановит выполнение стандартного поведения.

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md#quickinfoextension)
