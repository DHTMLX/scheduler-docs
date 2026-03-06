---
sidebar_label: "onYScaleClick"
title: "onYScaleClick event"
description: "사용자가 y축의 셀을 한 번 클릭할 때 발생합니다 (Timeline 뷰에서만 적용됨)"
---

# onYScaleClick

### Description

@short: 사용자가 y축의 셀을 한 번 클릭할 때 발생합니다 (Timeline 뷰에서만 적용됨)

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 클릭된 행의 0부터 시작하는 인덱스
- `section` - (required) *object* - 클릭된 셀에 해당하는 데이터 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    //여기에 커스텀 로직 작성
});
~~~
