---
sidebar_label: "load_format"
title: "load_format template"
description: "동적 로딩 모드에서 사용되는 요청 형식을 정의합니다."
---

# load_format

### Description

@short: 동적 로딩 모드에서 사용되는 요청 형식을 정의합니다.

@signature: load_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트입니다.

### Example

~~~jsx
scheduler.templates.load_format = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
    
}
~~~

### Details

기본적으로 요청은 다음 형식을 따릅니다:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

여기서 DATEHERE는 [load_date](api/config/load_date.md) 옵션에 따라 포맷된 유효한 날짜 값을 나타냅니다 *(기본적으로 **load_format** 템플릿 정의에 기반함).*

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_date](api/config/load_date.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md#dynamic-loading)
