---
sidebar_label: "onMouseDown"
title: "onMouseDown event"
description: "사용자가 미리 정의된 'onclick' 핸들러가 없는 스케줄러 요소를 클릭할 때 트리거됩니다."
---

# onMouseDown

### Description

@short: 사용자가 미리 정의된 'onclick' 핸들러가 없는 스케줄러 요소를 클릭할 때 트리거됩니다.

@signature: onMouseDown: (className: string) =\> void

### Parameters

- `className` - (required) *string* - 클릭된 요소의 CSS 클래스 이름

### Example

~~~jsx
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});
~~~

### Details

미리 정의된 'onclick' 핸들러가 포함된 스케줄러 요소는 아래 표에 자세히 나와 있습니다.

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>표 1 </strong>
  미리 정의된 'onclick' 핸들러가 있는 스케줄러 요소들
  </caption>
  <thead>
  <tr>
  <th>
  클래스 이름
  </th>
  <th>
  요소
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>dhx_cal_event_line</td>
  <td>Day, Week, Month, Units 뷰에 표시되는 다일 이벤트 및 Timeline 뷰의 모든 이벤트</td>
  </tr>
  <tr>
  <td>dhx_cal_event_clear</td>
  <td>Month 뷰의 단일일 이벤트</td>
  </tr>
  <tr>
  <td>dhx_event_move</td>
  <td>Day, Week, Units 뷰에서 이벤트를 드래그할 때 사용하는 이벤트 박스 헤더</td>
  </tr>
  <tr>
  <td>dhx_wa_ev_body</td>
  <td>WeekAgenda 뷰에 표시되는 이벤트</td>
  </tr>
  <tr>
  <td>dhx_event_resize</td>
  <td>Day, Week, Units 뷰에서 이벤트 크기를 조절하는 데 사용되는 이벤트 박스 하단 부분</td>
  </tr>
  <tr>
  <td>dhx_scale_holder</td>
  <td>Day, Week, Units 뷰의 컬럼</td>
  </tr>
  <tr>
  <td>dhx_scale_holder_now</td>
  <td>Day, Week, Units 뷰에서 현재 날짜를 나타내는 하이라이트된 컬럼</td>
  </tr>
  <tr>
  <td>dhx_month_body</td>
  <td>Month 뷰에서 헤더가 없는 셀</td>
  </tr>
  <tr>
  <td>dhx_matrix_cell</td>
  <td>Timeline 뷰의 셀</td>
  </tr>
  <tr>
  <td>dhx_marked_timespan</td>
  <td>마크(하이라이트)된 셀들</td>
  </tr>
  <tr>
  <td>dhx_time_block</td>
  <td>차단된 셀들</td>
  </tr>
  </tbody>
</table>
