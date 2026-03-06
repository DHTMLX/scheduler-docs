---
sidebar_label: "onQuickInfo"
title: "onQuickInfo event"
description: "当弹出编辑表单显示时触发"
---

# onQuickInfo

### Description

@short: 当弹出编辑表单显示时触发

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - 事件 ID

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
    // 在这里编写您的代码
});
~~~

### Details

:::note
 该事件需要启用 [quick_info](guides/extensions-list.md#quickinfo) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- 版本 4.4 中新增
