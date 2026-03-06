---
sidebar_label: "onAfterQuickInfo"
title: "onAfterQuickInfo event"
description: "在弹出事件窗体关闭后立即触发。"
---

# onAfterQuickInfo

### Description

@short: 在弹出事件窗体关闭后立即触发。

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - 事件ID

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){  
    // 你的代码  
});
~~~

### Details

:::note
 该事件需要激活 [quick_info](guides/extensions-list.md#quickinfo) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- 版本 4.4 中新增
