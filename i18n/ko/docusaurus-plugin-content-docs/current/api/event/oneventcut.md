---
sidebar_label: "onEventCut"
title: "onEventCut event"
description: "사용자가 'CTRL+X' 키보드 단축키를 누를 때 트리거됩니다 (이 기능은 'keyboard navigation' 확장 기능이 활성화된 경우에만 작동합니다)."
---

# onEventCut

### Description

@short: 사용자가 'CTRL+X' 키보드 단축키를 누를 때 트리거됩니다 (이 기능은 'keyboard navigation' 확장 기능이 활성화된 경우에만 작동합니다).

@signature: onEventCut: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("이벤트가 잘렸습니다: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
 이 이벤트는 [key_nav](guides/extensions-list.md#keyboard-navigation) 확장 기능이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)
