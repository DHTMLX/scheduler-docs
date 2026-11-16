---
sidebar_label: onBeforeEventGroupActiveChange
title: "onBeforeEventGroupActiveChange 이벤트"
description: "이벤트 그룹의 활성 상태가 변경되기 전에 발생합니다"
---

# onBeforeEventGroupActiveChange

### 설명

@short: 이벤트 그룹의 활성 상태가 변경되기 전에 발생합니다

@signature: onBeforeEventGroupActiveChange: (key: string | number | boolean, active: boolean) => boolean

### 매개변수

- `key` - (필수) *string | number | boolean* - 상태가 변경되는 그룹 키
- `active` - (필수) *boolean* - 요청된 활성 상태

### 반환값

- `result` - (boolean) - 변경을 취소하려면 `false`를 반환합니다

### 예제

~~~js
scheduler.attachEvent("onBeforeEventGroupActiveChange", (key, active) => {
    return key !== "personal" || active;
});
~~~

### 세부 정보

이 이벤트는 `scheduler.ext.eventGroups.setActive()`가 그룹을 변경하기 전과 이벤트 그룹 목록이 체크박스 변경을 적용하기 전에 발생합니다. `false`를 반환하면 현재 상태를 유지하고 `onEventGroupActiveChange`가 발생하지 않습니다.