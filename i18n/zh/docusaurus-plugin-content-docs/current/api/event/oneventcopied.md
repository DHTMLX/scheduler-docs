---
sidebar_label: "onEventCopied"
title: "onEventCopied event"
description: "当用户按下 'CTRL+C' 键盘快捷键时触发（仅在启用了 'keyboard navigation' 扩展时有效）"
---

# onEventCopied

### Description

@short: 当用户按下 'CTRL+C' 键盘快捷键时触发（仅在启用了 'keyboard navigation' 扩展时有效）

@signature: onEventCopied: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - 被复制事件的对象

### Example

~~~jsx
scheduler.attachEvent("onEventCopied", function(ev) {
    dhtmlx.message("您已复制事件: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 该事件仅在激活了 [key_nav](guides/extensions-list.md#keyboard-navigation) 扩展时生效。 
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
