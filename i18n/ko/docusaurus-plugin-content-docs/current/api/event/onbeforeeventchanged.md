---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged event"
description: "드래그-앤-드롭으로 이벤트가 변경되었지만 변경 내용은 아직 저장되지 않았습니다."
---

# onBeforeEventChanged

### Description

@short: 드래그-앤-드롭으로 이벤트가 변경되었을 때 발생하며, 변경 내용은 아직 저장되지 않았습니다.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (필수) *object* - 변경 후의 이벤트 데이터 객체
- `e` - (필수) *Event* - 네이티브 이벤트 객체
- `is_new` - (필수) *boolean* - 사용자가 새 이벤트를 변경한 경우 true를 반환; 편집된 이벤트가 이미 존재하는 경우 false
- `original` - (필수) *object* - 변경 전의 이벤트 데이터 객체

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 실행될지 여부를 정의합니다 (`true` 이면 실행, `false` 이면 취소)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", (ev, e, is_new, original) => {
    // 여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이벤트는 새 이벤트가 추가되거나 기존 이벤트가 드래그-앤-드롭으로 변경될 때 발생합니다.

- 핸들러 함수의 첫 번째 매개변수는 데이터 아이템 객체를 받으며, 데이터 아이템의 id가 아님에 주의하십시오. 새로 생성된 데이터 아이템은 아직 ID가 없을 수 있습니다.
- 새 데이터 아이템을 생성할 때 원래의 이벤트 객체는 비어 있는 객체가 됩니다.
- 이 이벤트는 차단 가능합니다: 핸들러에서 `false`를 반환하면 데이터 업데이트가 방지됩니다.