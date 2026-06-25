---
sidebar_label: onDblClick
title: "onDblClick 이벤트"
description: "사용자가 이벤트를 더블 클릭할 때 발생합니다"
---

# onDblClick

### Description

@short: 사용자가 이벤트를 더블 클릭할 때 발생합니다

@signature: onDblClick: (id: string, e: Event) => boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- `result` - (boolean) - 기본 동작이 트리거될지 여부를 정의합니다(`true`) 또는 취소될지(`false`)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", (id, e) => {
    // 여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. 기본 동작을 취소하려면 `false`를 반환합니다.