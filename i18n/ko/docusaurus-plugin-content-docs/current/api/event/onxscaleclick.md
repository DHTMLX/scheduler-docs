---
sidebar_label: "onXScaleClick"
title: "onXScaleClick event"
description: "사용자가 x축 셀을 싱글 클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)"
---

# onXScaleClick

### Description

@short: 사용자가 x축 셀을 싱글 클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)

@signature: onXScaleClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 클릭된 열의 0부터 시작하는 인덱스
- `value` - (required) *object* - 클릭된 셀의 시작 타임스탬프를 나타내는 Date 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    //여기에 사용자 정의 로직 작성
});
~~~
