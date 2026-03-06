---
sidebar_label: "onEventCopied"
title: "onEventCopied event"
description: "사용자가 'CTRL+C' 키보드 단축키를 눌렀을 때 트리거됩니다 (단, 'keyboard navigation' 확장 기능이 활성화된 경우에만 작동)."
---

# onEventCopied

### Description

@short: 사용자가 'CTRL+C' 키보드 단축키를 눌렀을 때 트리거됩니다 (단, 'keyboard navigation' 확장 기능이 활성화된 경우에만 작동).

@signature: onEventCopied: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - 복사된 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventCopied", function(ev) {
    dhtmlx.message("이벤트가 복사되었습니다: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 이 이벤트는 [key_nav](guides/extensions-list.md#keyboard-navigation) 확장 기능이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
