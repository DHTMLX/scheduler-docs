---
sidebar_label: "onYScaleDblClick"
title: "onYScaleDblClick event"
description: "사용자가 y축의 셀을 더블클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)"
---

# onYScaleDblClick

### Description

@short: 사용자가 y축의 셀을 더블클릭할 때 트리거됩니다 (Timeline 뷰에서만 적용됨)

@signature: onYScaleDblClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 클릭된 행의 0부터 시작하는 인덱스
- `section` - (required) *object* - 클릭된 셀과 연관된 데이터 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onYScaleDblClick", function (index, section, e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~
