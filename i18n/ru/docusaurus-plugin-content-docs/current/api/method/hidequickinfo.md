---
sidebar_label: "hideQuickInfo"
title: "hideQuickInfo method"
description: "Скрывает всплывающую форму события, если она в данный момент открыта."
---

# hideQuickInfo

### Description

@short: Скрывает всплывающую форму события, если она в данный момент открыта.

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 Для работы этого метода необходимо включить плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
