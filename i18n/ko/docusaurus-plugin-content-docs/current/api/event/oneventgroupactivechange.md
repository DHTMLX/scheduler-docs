---
sidebar_label: onEventGroupActiveChange
title: "onEventGroupActiveChange 이벤트"
description: "이벤트 그룹의 활성 상태가 변경된 후 발생합니다"
---

# onEventGroupActiveChange

### 설명

@short: 이벤트 그룹의 활성 상태가 변경된 후 발생합니다

@signature: onEventGroupActiveChange: (key: string | number | boolean, active: boolean) => void

### 매개변수

- `key` - (필수) *string | number | boolean* - 변경된 그룹 키
- `active` - (필수) *boolean* - 그룹의 새 활성 상태

### 예제

~~~js
scheduler.attachEvent("onEventGroupActiveChange", (key, active) => {
    console.log(key, active ? "is visible" : "is hidden");
});
~~~

### 세부 정보

이 이벤트는 `scheduler.ext.eventGroups.setActive()` 또는 Sidebar의 이벤트 그룹 목록을 통해 그룹 상태가 변경된 후 발생합니다. Scheduler는 변경 과정에서 이벤트 표시를 새로 고칩니다.