---
sidebar_label: "render"
title: "render method"
description: "스케줄러 디스플레이를 새로 고칩니다"
---

# render

### Description

@short: 스케줄러 디스플레이를 새로 고칩니다

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 표시할 날짜
- `view` - (optional) *string* - 전환할 뷰의 이름

### Example

~~~jsx
// 새로운 설정으로 레이아웃 업데이트
scheduler.config.hour_size_px = 88;
scheduler.render();


// 다른 날짜로 변경
scheduler.render(new Date(2020,7,4));

// 다른 뷰로 변경
scheduler.render(null, "week");
~~~

### Details

이 메서드는 [scheduler.setCurrentView](api/method/setcurrentview.md)의 별칭으로 작동하며 동일한 방식으로 동작합니다.

- 기본 뷰 이름은 'day', 'week', 'month'를 포함합니다. 다른 뷰의 경우 해당 <b>name</b> 파라미터를 사용하세요.
- 이 메서드를 호출하면 [onBeforeViewChange](api/event/onbeforeviewchange.md) 및 [onViewChange](api/event/onviewchange.md) 이벤트가 발생합니다.
- [updateView](api/method/updateview.md)와 유사하지만, 주요 차이점은 [updateView](api/method/updateview.md)는 **어떤 이벤트도 발생시키지 않습니다**.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
