---
sidebar_label: onBeforeViewChange
title: "onBeforeViewChange 이벤트"
description: "사용자가 현재 보기를 다른 보기로 변경하기 전에 발생합니다"
---

# onBeforeViewChange

### Description

@short: 사용자가 현재 보기를 다른 보기로 변경하기 전에 발생합니다

@signature: onBeforeViewChange: (old_mode: string, old_date: Date, mode: string, date: Date) =\> boolean

### Parameters

- `old_mode` - (required) *string* - 현재 활성 뷰
- `old_date` - (required) *Date* - 현재 활성 날짜
- `mode` - (required) *string* - 새로운 뷰
- `date` - (required) *Date* - 새로운 날짜

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (`true`) 또는 취소될지 (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", (old_mode, old_date, mode, date) => {
    // 여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Related samples
- [맵 뷰 구성](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- 이벤트는 차단 가능합니다. `false`를 반환하면 Scheduler가 현재 보기를 유지합니다.
- 또한 Scheduler가 페이지에 처음 렌더링될 때도 이 이벤트가 발생합니다. 이 경우 `old_mode`와 `old_date` 매개변수는 정의되지 않습니다.