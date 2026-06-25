---
sidebar_label: hideQuickInfo
title: "Метод hideQuickInfo"
description: "скрывает всплывающее окно формы события (если оно в данный момент активно)"
---

# hideQuickInfo

### Description

@short: Скрывает всплывающее окно формы события (если оно в данный момент активно)

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 Метод требует активации плагина [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Full List of Extensions](guides/extensions-list.md#quick-info)