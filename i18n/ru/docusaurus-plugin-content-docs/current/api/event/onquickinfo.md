---
sidebar_label: "onQuickInfo"
title: "onQuickInfo event"
description: "Срабатывает при появлении всплывающей формы редактирования"
---

# onQuickInfo

### Description

@short: Срабатывает при появлении всплывающей формы редактирования

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - id события

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
    // ваш код здесь
});
~~~

### Details

:::note
 Для работы события требуется включенный плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)
- [Мобильная адаптивность Scheduler](guides/touch-support.md)

### Change log
- добавлено в версии 4.4
