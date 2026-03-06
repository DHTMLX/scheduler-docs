---
sidebar_label: "onEventPasted"
title: "onEventPasted event"
description: "사용자가 'CTRL+V' 키보드 단축키를 눌렀을 때 트리거됩니다."
---

# onEventPasted

### Description

@short: 사용자가 'CTRL+V' 키보드 단축키를 눌렀을 때 트리거됩니다.

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - 이벤트가 붙여넣기 전에 복사되었는지 아니면 잘라내기 되었는지를 나타냅니다. <em>true</em> 값은 이벤트가 복사되었음을 의미합니다.
- `pasted_ev` - (required) *object* - 붙여넣기 동작으로 생성된 새 이벤트 객체입니다.
- `original_ev` - (required) *object* - 복사되거나 잘라낸 원본 이벤트 객체입니다.

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    //여기에 사용자 정의 로직 작성
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 이 이벤트는 [key_nav](guides/extensions-list.md#keyboard-navigation) 확장이 활성화되어 있어야 합니다. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
