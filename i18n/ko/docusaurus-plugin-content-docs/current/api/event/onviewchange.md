---
sidebar_label: onViewChange
title: "onViewChange 이벤트"
description: "현재 보기가 다른 보기로 변경된 후에 발생합니다"
---

# onViewChange

### Description

@short: 현재 보기가 다른 보기로 변경된 직후에 발생합니다

@signature: onViewChange: (new_mode: string, new_date: Date) =\> void

### Parameters

- `new_mode` - (required) *string* - 새로운 보기
- `new_date` - (required) *Date* - 새로운 날짜

### Example

~~~jsx
scheduler.attachEvent("onViewChange", (new_mode, new_date) => {
    // 여기에 사용자 정의 로직 작성
});
~~~

### Details

현재 보기가 변경될 때마다 이 이벤트가 호출됩니다.