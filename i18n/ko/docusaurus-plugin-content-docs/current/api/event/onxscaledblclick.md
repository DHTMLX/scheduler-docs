---
sidebar_label: "onXScaleDblClick"
title: "onXScaleDblClick event"
description: "사용자가 x축 셀을 더블 클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)"
---

# onXScaleDblClick

### Description

@short: 사용자가 x축 셀을 더블 클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 클릭한 열의 0부터 시작하는 인덱스
- `value` - (required) *object* - 클릭한 셀의 시작 타임스탬프를 나타내는 Date 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    //여기에 사용자 정의 로직 작성
});
~~~
