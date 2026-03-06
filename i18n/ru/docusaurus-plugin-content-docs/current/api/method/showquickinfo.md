---
sidebar_label: "showQuickInfo"
title: "showQuickInfo method"
description: "открывает всплывающую форму события для заданного события"
---

# showQuickInfo

### Description

@short: Открывает всплывающую форму события для заданного события

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
    scheduler.showQuickInfo(eventId);    
},1);
~~~

### Details

:::note
 Этот метод требует включения плагина [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
