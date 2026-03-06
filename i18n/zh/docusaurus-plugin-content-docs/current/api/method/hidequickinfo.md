---
sidebar_label: "hideQuickInfo"
title: "hideQuickInfo method"
description: "如果弹出事件表单当前处于打开状态，则隐藏该表单。"
---

# hideQuickInfo

### Description

@short: 如果弹出事件表单当前处于打开状态，则隐藏该表单。

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
scheduler.showQuickInfo(5);
...
scheduler.hideQuickInfo();
~~~

### Details

:::note
 此方法需要启用 [quick_info](guides/extensions-list.md#quickinfo) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
