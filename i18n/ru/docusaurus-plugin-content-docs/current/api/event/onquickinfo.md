---
sidebar_label: onQuickInfo
title: "onQuickInfo событие"
description: "срабатывает, когда появляется всплывающая форма редактирования"
---

# onQuickInfo

### Description

@short: Вызывает событие, когда появляется всплывающая форма редактирования

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
    // любая ваша логика здесь
});
~~~

### Details

:::note
 Событие требует активации плагина [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md)
- [Мобильный адаптивный планировщик](guides/touch-support.md)

### Change log
- добавлено в версии 4.4