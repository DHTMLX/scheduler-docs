---
sidebar_label: "onLoadError"
title: "onLoadError event"
description: "스케줄러가 데이터를 파싱하지 못하거나 서버가 4xx 또는 5xx 상태 코드를 응답할 때 발생합니다."
---

# onLoadError

### Description

@short: 스케줄러가 데이터를 파싱하지 못하거나 서버가 4xx 또는 5xx 상태 코드를 응답할 때 발생합니다.

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - Ajax 요청 객체

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("데이터 로드 실패");
});
~~~

### Details

이 이벤트는 [parse](api/method/parse.md) 및 [load](api/method/load.md) 메서드에 의해 호출됩니다.

**parse** 메서드에 의해 트리거될 때, 핸들러 함수는 파싱할 데이터를 포함하는 *responseText* 속성을 가진 객체를 받습니다:

~~~js
{
    responseText: parseArgument
}
~~~
