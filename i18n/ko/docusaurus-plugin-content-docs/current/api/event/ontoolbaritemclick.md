---
sidebar_label: onToolbarItemClick
title: "onToolbarItemClick 이벤트"
description: "Toolbar 항목이 활성화될 때 발생합니다"
---

# onToolbarItemClick

### 설명

@short: Toolbar 항목이 활성화될 때 발생합니다

@signature: onToolbarItemClick: (id: string | number, item: object, event: Event | null) =\> boolean

### 매개변수

- `id` - (필수) *string | number* - 항목 ID
- `item` - (필수) *object* - 항목 설정의 복사본이며 `occurrence` 속성은 반복된 ID를 식별합니다
- `event` - (필수) *Event | null* - 네이티브 클릭 이벤트 또는 키보드/터치 활성화 시 `null`

### 반환값

- `result` - (boolean) - 내장 작업이나 뷰 전환을 취소하려면 `false`를 반환합니다

### 예제

~~~jsx
scheduler.attachEvent("onToolbarItemClick", (id, item, event) => {
    if (id === "add_event" && scheduler.config.readonly) return false;
    return true;
});
~~~

### 세부 정보

[Toolbar](guides/toolbar.md) 플러그인이 필요합니다. 이 이벤트는 레거시 항목의 `click` 콜백 후, Toolbar 내장 작업이나 뷰 작업 전에 발생합니다. `false`를 반환해도 레거시 콜백은 취소되지 않지만 이어지는 Scheduler 작업은 막습니다. 뷰 탭과 `views` 메뉴는 선택한 뷰 이름을 `id`로 전달합니다.

### 관련 가이드

- [Toolbar](guides/toolbar.md)