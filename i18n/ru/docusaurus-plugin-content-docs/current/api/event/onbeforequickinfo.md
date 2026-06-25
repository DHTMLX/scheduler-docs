---
sidebar_label: onBeforeQuickInfo
title: "onBeforeQuickInfo event"
description: "срабатывает непосредственно перед отображением всплывающего окна Quick Info для события"
---

# onBeforeQuickInfo

### Description

@short: Срабатывает непосредственно перед отображением всплывающего окна Quick Info для события

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (обязательный) *number | string* - идентификатор события

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

Это событие можно отменить. Возвращайте false, чтобы отменить обработку по умолчанию.

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md#quick-info-extension)