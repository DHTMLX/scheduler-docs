---
sidebar_label: "onBeforeEventDelete"
title: "onBeforeEventDelete event"
description: "사용자가 삭제 버튼(이벤트 바 또는 상세 창에서)을 클릭한 직후에 트리거됩니다."
---

# onBeforeEventDelete

### Description

@short: 사용자가 삭제 버튼(이벤트 바 또는 상세 창에서)을 클릭한 직후에 트리거됩니다.

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `ev` - (required) *object* - 이벤트의 데이터 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    //여기에 사용자 정의 로직을 작성하세요
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 기본 삭제 프로세스가 중단됩니다.
