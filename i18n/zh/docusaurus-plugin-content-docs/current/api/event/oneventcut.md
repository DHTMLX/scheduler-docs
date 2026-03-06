---
sidebar_label: "onEventCut"
title: "onEventCut event"
description: "当用户按下 'CTRL+X' 快捷键时触发该事件（仅当启用了'keyboard navigation'扩展时有效）"
---

# onEventCut

### Description

@short: 当用户按下 'CTRL+X' 快捷键时触发该事件（仅当启用了"keyboard navigation"扩展时有效）

@signature: onEventCut: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("您已剪切事件：<br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
 该事件仅在启用 [key_nav](guides/extensions-list.md#keyboard-navigation) 扩展时生效。 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)
