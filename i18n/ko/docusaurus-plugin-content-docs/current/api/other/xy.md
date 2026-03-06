---
sidebar_label: "xy"
title: "xy config"
description: "스케줄러의 다양한 요소 크기를 정의합니다"
---

# xy

### Description

@short: 스케줄러의 다양한 요소 크기를 정의합니다

@signature: xy: SchedulerSizes

### Example

~~~jsx
scheduler.xy.scale_height = 25; // X축의 높이를 설정합니다
...
scheduler.init('scheduler_here', new Date(), "month");
~~~

### Details

**xy** 객체는 다음과 같은 속성들을 포함합니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성
  </th>
  <th>
  설명
  </th>
  <th>
  기본값
  </th>
  <th>
  적용 뷰
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>bar_height</td>
  <td>월별 뷰에서 작업 바의 높이</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>editor_width</td>
  <td>이벤트 텍스트 입력 필드의 너비</td>
  <td>140</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>lightbox_additional_height</td>
  <td>라이트박스에 추가되는 높이</td>
  <td>50</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>map_date_width</td>
  <td>맵 뷰에서 날짜 열의 너비</td>
  <td>188</td>
  <td>map</td>
  </tr>
  <tr>
  <td>map_description_width</td>
  <td>맵 뷰에서 설명 열의 너비</td>
  <td>400</td>
  <td>map</td>
  </tr>
  <tr>
  <td>margin_left</td>
  <td>메인 스케줄러 영역의 왼쪽 여백</td>
  <td>0</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>margin_top</td>
  <td>메인 스케줄러 영역의 상단 여백</td>
  <td>0</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>menu_width</td>
  <td>선택 메뉴의 너비</td>
  <td>25</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>min_event_height</td>
  <td>이벤트 박스의 최소 높이</td>
  <td>40</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>month_scale_height</td>
  <td>월별 뷰에서 셀 내부 이벤트의 수직 오프셋</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>scale_height</td>
  <td>X축의 높이</td>
  <td>20</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>scale_width</td>
  <td>Y축의 너비</td>
  <td>50</td>
  <td>day, week, timeline, units</td>
  </tr>
  <tr>
  <td>scroll_width</td>
  <td>스크롤바 영역의 너비</td>
  <td>18</td>
  <td>모든 뷰</td>
  </tr>
  </tbody>
</table>

:::note

참고로, **xy** 하위의 모든 속성들은 'number' 데이터 타입입니다.
 
:::

## Illustration images

<h3 id="month">월별 뷰</h3> 
![month_xy_property](/img/month_xy_property.png)

<h3 id="week">주별 뷰</h3> 
![week_xy_property](/img/week_xy_property.png)

<h3 id="day">일별 뷰</h3> 
![day_xy_property](/img/day_xy_property.png)

<h3 id="map">맵 뷰</h3> 
![map_xy_property](/img/map_xy_property.png)

<h3 id="lightbox">라이트박스</h3> 
![lightbox_xy_property](/img/lightbox_xy_property.png)

### Change log
- **nav_height** 속성은 v7.0에서 제거되었습니다; 툴바 크기 조절은 이제 CSS로 제어됩니다.
