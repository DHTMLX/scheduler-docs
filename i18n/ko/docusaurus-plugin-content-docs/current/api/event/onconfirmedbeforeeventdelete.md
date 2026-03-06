---
sidebar_label: "onConfirmedBeforeEventDelete"
title: "onConfirmedBeforeEventDelete event"
description: "사용자가 삭제 버튼을 클릭하고 삭제를 확인한 직후에 트리거됩니다 (이벤트의 바 또는 상세 창에서)."
---

# onConfirmedBeforeEventDelete

### Description

@short: 사용자가 삭제 버튼을 클릭하고 삭제를 확인한 직후에 트리거됩니다 (이벤트의 바 또는 상세 창에서).

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    // 여기에 커스텀 로직을 작성할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 기본 동작이 발생하지 않습니다.
