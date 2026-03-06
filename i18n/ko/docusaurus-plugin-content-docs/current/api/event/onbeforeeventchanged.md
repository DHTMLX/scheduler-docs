---
sidebar_label: "onBeforeEventChanged"
title: "onBeforeEventChanged event"
description: "드래그 앤 드롭을 통해 이벤트가 수정될 때 트리거되며, 변경 사항이 아직 저장되지 않은 상태입니다."
---

# onBeforeEventChanged

### Description

@short: 드래그 앤 드롭을 통해 이벤트가 수정될 때 트리거되며, 변경 사항이 아직 저장되지 않은 상태입니다.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - 변경 후 이벤트의 데이터 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체
- `is_new` - (required) *boolean* - 사용자가 새 이벤트를 수정 중이면 'true', 기존 이벤트를 편집 중이면 'false'를 반환
- `original` - (required) *object* - 변경 전 이벤트의 데이터 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    //여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이 이벤트는 드래그 앤 드롭을 통해 새 이벤트가 추가되거나 기존 이벤트가 업데이트될 때마다 발생합니다.

- 핸들러 함수의 첫 번째 매개변수는 단순한 ID가 아니라 데이터 아이템 객체 자체임을 기억하세요 (새 아이템은 아직 ID가 없을 수 있습니다).
- 새 데이터 아이템을 생성할 때, 변경되지 않은 이벤트는 빈 객체로 표현됩니다.
- 이 이벤트는 취소 가능하며, 핸들러에서 *false*를 반환하면 데이터 업데이트가 중단됩니다.
