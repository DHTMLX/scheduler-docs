---
sidebar_label: "onSaveError"
title: "onSaveError event"
description: "데이터 업데이트 중 오류가 발생했을 때 트리거됩니다"
---

# onSaveError

### Description

@short: 데이터 업데이트 중 오류가 발생했을 때 트리거됩니다

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - 업데이트에 실패한 이벤트 ID들을 포함하는 배열
- `response` - (required) *XMLHttpRequest* - Ajax 요청 객체

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("데이터 업데이트에 실패했습니다");
})
~~~

### Details

:::note

이 이벤트는 클라이언트-서버 통신을 위해 dataProcessor 라이브러리를 사용할 때만 트리거됩니다.
 
:::
