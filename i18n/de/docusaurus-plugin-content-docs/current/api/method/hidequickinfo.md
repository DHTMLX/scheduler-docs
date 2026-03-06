---
sidebar_label: "hideQuickInfo"
title: "hideQuickInfo method"
description: "Versteckt das Pop-up Event-Formular, falls es aktuell geöffnet ist."
---

# hideQuickInfo

### Description

@short: Versteckt das Pop-up Event-Formular, falls es aktuell geöffnet ist.

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 Diese Methode benötigt das aktivierte [quick_info](guides/extensions-list.md#quick-info) Plugin. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
