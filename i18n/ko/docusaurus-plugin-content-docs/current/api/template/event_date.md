---
sidebar_label: "event_date"
title: "event_date template"
description: "이벤트 시작 및 종료 날짜의 시간 부분을 정의합니다. 주로 다른 템플릿에서 시간 간격을 표시할 때 사용됩니다."
---

# event_date

### Description

@short: 이벤트 시작 및 종료 날짜의 시간 부분을 정의합니다. 주로 다른 템플릿에서 시간 간격을 표시할 때 사용됩니다.

@signature: event_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트입니다.

### Example

~~~jsx
scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}
~~~

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#lightbox)
