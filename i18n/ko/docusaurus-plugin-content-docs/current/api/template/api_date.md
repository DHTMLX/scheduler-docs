---
sidebar_label: "api_date"
title: "api_date template"
description: "API 메서드가 날짜를 처리할 때 사용하는 날짜 형식을 설정합니다. 이는 들어오는 날짜 값을 올바르게 해석하는 데 도움이 됩니다."
---

# api_date

### Description

@short: API 메서드가 날짜를 처리할 때 사용하는 날짜 형식을 설정합니다. 이는 들어오는 날짜 값을 올바르게 해석하는 데 도움이 됩니다.

@signature: api_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 형식을 지정해야 하는 날짜

### Returns
- ` text` - (string) - 스케줄러에서 렌더링할 html 텍스트

### Example

~~~jsx
scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
};
~~~
