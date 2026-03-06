---
sidebar_label: "onCellDblClick"
title: "onCellDblClick event"
description: "사용자가 셀을 더블 클릭할 때 발생하는 이벤트 (Timeline 뷰에서만 적용)"
---

# onCellDblClick

### Description

@short: 사용자가 셀을 더블 클릭할 때 발생하는 이벤트 (Timeline 뷰에서만 적용)

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - 클릭된 열의 0부터 시작하는 인덱스
- `y_ind` - (required) *number* - 클릭된 행의 0부터 시작하는 인덱스
- `x_val` - (required) *object* - 클릭된 셀의 시작 타임스탬프를 나타내는 Date 객체
- `y_val` - (required) *array* - 클릭된 셀에 위치한 데이터 아이템 객체들을 포함하는 배열
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    //사용자 정의 로직을 여기에 작성할 수 있습니다
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note

이 이벤트는 Timeline 뷰에서만 발생합니다
 
:::
