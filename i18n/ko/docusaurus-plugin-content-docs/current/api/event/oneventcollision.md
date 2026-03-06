---
sidebar_label: "onEventCollision"
title: "onEventCollision event"
description: "사용자가 이미 예약된 시간 슬롯 내에서 새 이벤트를 생성하거나 기존 이벤트를 수정하려고 할 때 트리거됩니다."
---

# onEventCollision

### Description

@short: 사용자가 이미 예약된 시간 슬롯 내에서 새 이벤트를 생성하거나 기존 이벤트를 수정하려고 할 때 트리거됩니다.

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - 이벤트 객체
- `evs` - (required) *array* - 동일한 시간 슬롯에 이미 예약된 이벤트 객체들의 컬렉션

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    // 여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 [collision](guides/extensions-list.md#collision) 플러그인이 활성화되어 있어야 작동합니다. 
:::

핸들러에서 <i>true</i>를 반환하면 이벤트가 추가되거나 수정되지 않습니다. <i>false</i>를 반환하면 충돌이 허용되어, 겹침에도 불구하고 이벤트가 추가되거나 수정됩니다.
