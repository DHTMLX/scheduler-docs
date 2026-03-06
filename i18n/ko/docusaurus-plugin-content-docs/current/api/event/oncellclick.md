---
sidebar_label: "onCellClick"
title: "onCellClick event"
description: "사용자가 셀을 한 번 클릭할 때 발생하는 이벤트 (Timeline 뷰에서만 적용됨)"
---

# onCellClick

### Description

@short: 사용자가 셀을 한 번 클릭할 때 발생하는 이벤트 (Timeline 뷰에서만 적용됨)

@signature: onCellClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - 클릭한 셀의 열 인덱스 (0부터 시작)
- `y_ind` - (required) *number* - 클릭한 셀의 행 인덱스 (0부터 시작)
- `x_val` - (required) *object* - 클릭한 셀의 시작 시간을 나타내는 Date 객체
- `y_val` - (required) *array* - 클릭한 셀에 위치한 데이터 아이템 객체들을 포함하는 배열
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~

### Details

:::note

이 이벤트는 Timeline 뷰에서만 트리거됩니다
 
:::
