---
sidebar_label: "onAfterQuickInfo"
title: "onAfterQuickInfo event"
description: "Срабатывает сразу после закрытия формы всплывающего окна."
---

# onAfterQuickInfo

### Description

@short: Срабатывает сразу после закрытия формы всплывающего окна.

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){  
    // ваш код здесь  
});
~~~

### Details

:::note
 Для работы события требуется активировать плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)
- [Мобильная адаптивность Scheduler](guides/touch-support.md)

### Change log
- добавлено в версии 4.4
