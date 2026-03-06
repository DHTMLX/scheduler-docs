---
sidebar_label: "onBeforeEventPasted"
title: "onBeforeEventPasted event"
description: "사용자가 'CTRL+V' 키보드 단축키를 누르기 직전에 트리거됩니다."
---

# onBeforeEventPasted

### Description

@short: 사용자가 'CTRL+V' 키보드 단축키를 누르기 직전에 트리거됩니다.

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> boolean

### Parameters

- `isCopy` - (required) *boolean* - 이벤트가 붙여넣기 전에 복사되었는지 또는 잘렸는지를 나타냅니다. <em>true</em> 값은 이벤트가 복사되었음을 의미합니다.
- `pasted_ev` - (required) *object* - 붙여넣기 후 생성된 새로운 이벤트 객체입니다.
- `original_ev` - (required) *object* - 복사되거나 잘린 원본 이벤트 객체입니다.

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 차단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // 여기서 `pastedEvent`를 수정할 수 있습니다.
    return true; 
});
~~~

### Details

'keyboard navigation' 확장이 활성화되어 있는지 확인하세요.

### Related API
- [onEventPasted](api/event/oneventpasted.md)
