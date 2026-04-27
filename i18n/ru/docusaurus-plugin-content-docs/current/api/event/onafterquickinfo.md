---
sidebar_label: onAfterQuickInfo
title: "onAfterQuickInfo event"
description: "срабатывает после закрытия всплывающей формы события"
---

# onAfterQuickInfo

### Description

@short: Срабатывает после закрытия всплывающей формы события

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (обязательный) *string* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){
    // любая ваша логика здесь
});
~~~

### Details

:::note
 Это событие требует активации плагина [quick_info](guides/extensions-list.md#quick-info). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quick-info)
- [Мобильный адаптивный планировщик](guides/touch-support.md)

### Change log
- добавлено в версии 4.4