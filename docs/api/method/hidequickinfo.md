---
sidebar_label: hideQuickInfo
title: "hideQuickInfo method"
description: "hides the pop-up event form (if it's currently active)"
---

# hideQuickInfo

### Description

@short: Hides the pop-up event form (if it's currently active)

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 The method requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
