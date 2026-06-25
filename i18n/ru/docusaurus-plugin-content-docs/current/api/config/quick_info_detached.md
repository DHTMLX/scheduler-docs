---
sidebar_label: quick_info_detached
title: "конфигурация quick_info_detached"
description: "задаёт, будет ли форма события появляться слева/справа от экрана или рядом с выбранным событием"
---

# quick_info_detached

### Description

@short: Определяет, будет ли форма события появляться слева или справа от экрана или около выбранного события

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"day");
~~~

**Значение по умолчанию:** true (<i>форма события будет появляться рядом с выбранным событием</i>)

### Related samples
- [Сенсорный планировщик](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Сенсорный планировщик. Управление позицией формы события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 Свойство требует активации плагина [quick_info](guides/extensions-list.md#quick-info). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Мобильный адаптивный планировщик](guides/touch-support.md)
- [Полный список расширений](guides/extensions-list.md#quick-info)