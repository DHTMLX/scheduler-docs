---
sidebar_label: onToolbarItemChange
title: "onToolbarItemChange 이벤트"
description: "Toolbar 값 항목이 변경될 때 발생합니다"
---

# onToolbarItemChange

### 설명

@short: Toolbar 값 항목이 변경될 때 발생합니다

@signature: onToolbarItemChange: (id: string | number, value: any, item: object) =\> boolean

### 매개변수

- `id` - (필수) *string | number* - 항목 ID
- `value` - (필수) *any* - 새로 선택한 값
- `item` - (필수) *object* - 항목 설정의 복사본이며 `occurrence` 속성은 반복된 ID를 식별합니다

### 반환값

- `result` - (boolean) - 이전 값을 복원하고 작업을 취소하려면 `false`를 반환합니다

### 예제

~~~jsx
scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "views" && value === "month" && !canOpenMonth()) return false;
    return true;
});
~~~

### 세부 정보

[Toolbar](guides/toolbar.md) 플러그인이 필요합니다. 이 이벤트는 `combo`, `segmented`, segmented `views` 항목 같은 값 컨트롤에서 사용됩니다. `false`를 반환하면 공유 Toolbar가 마지막으로 승인된 값을 복원합니다.

### 관련 가이드

- [Toolbar](guides/toolbar.md)