---
sidebar_label: "onEventChanged"
title: "onEventChanged event"
description: "사용자가 이벤트 편집을 완료하고 업데이트를 저장할 때(이벤트 바 또는 상세 창에서 편집 및 저장 버튼 클릭 후) 한 번 트리거됩니다."
---

# onEventChanged

### Description

@short: 사용자가 이벤트 편집을 완료하고 업데이트를 저장할 때(이벤트 바 또는 상세 창에서 편집 및 저장 버튼 클릭 후) 한 번 트리거됩니다.

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `ev` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    //여기에 사용자 정의 로직 작성
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
