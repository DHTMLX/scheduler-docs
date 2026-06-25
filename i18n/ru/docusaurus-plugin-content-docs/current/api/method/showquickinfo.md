---
sidebar_label: showQuickInfo
title: "showQuickInfo метод"
description: "отображает всплывающую форму события для указанного события"
---

# showQuickInfo

### Description

@short: Отображает всплывающую форму события для указанного события

@signature: showQuickInfo: (id: string) =\> void

### Parameters

- `id` - (обязательный) *string* - идентификатор события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
    scheduler.showQuickInfo(eventId);    
},1);
~~~

### Details

:::note
 Метод требует активации плагина [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Мобильный адаптивный планировщик](guides/touch-support.md)
- [Полный список расширений](guides/extensions-list.md#quick-info)