---
sidebar_label: "addMarkedTimespan"
title: "addMarkedTimespan method"
description: "날짜를 표시하며, 특정 설정에 따라 차단할 수도 있습니다 (제한 구간에 커스텀 스타일을 적용 가능)."
---

# addMarkedTimespan

### Description

@short: 날짜를 표시하며, 특정 설정에 따라 차단할 수도 있습니다 (제한 구간에 커스텀 스타일을 적용 가능).

@signature: addMarkedTimespan: (config: any) =\> number

### Parameters

- `config` - (required) *object* - 표시하거나 차단할 시간 구간을 정의하는 설정 객체

### Returns
- ` id` - (number) - 추가된 시간 구간의 ID

### Example

~~~jsx
//날짜 표시
scheduler.addMarkedTimespan({  
    days:  5,               // 매주 금요일 표시
    zones: "fullday",       // 하루 종일 표시
    css:   "gray_section"   // 적용할 CSS 클래스
});
scheduler.updateView();

//날짜 표시 및 차단
scheduler.addMarkedTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" // 고정된 값입니다
});
scheduler.updateView();
~~~

### Related samples
- [Highlighting timespans](https://docs.dhtmlx.com/scheduler/samples/09_api/03_highlighted_timespans.html)
- [Highlighting sections in Timeline and Units views](https://docs.dhtmlx.com/scheduler/samples/09_api/04_highlighted_sections_units.html)

### Details

이 메서드는 버전 3.5부터 사용할 수 있습니다.

:::note
 이 메서드를 사용하려면 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

이 메서드를 호출한 직후에는 표시(차단)가 즉시 적용되지 않습니다. 변경 사항을 적용하려면 [updateView](api/method/updateview.md)를 호출해야 합니다.
 
:::

<br>

## 설정 객체 속성

설정 객체는 다음 속성들을 포함할 수 있습니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성 
  </th>
  <th>
  설명
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> 제한이 시작되는 시점을 정의하는 Date 객체</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 2012년 5월 3일부터 'end_date'까지 이벤트 생성 차단
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 제한이 끝나는 시점을 정의하는 Date 객체</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 'start_date'부터 2012년 9월 3일까지 이벤트 생성 차단
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> 제한할 요일</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] // 일요일, 화요일, 토요일 제한
days:"fullweek" // 주 전체 제한
days:new Date(2012,6,1) // 2012년 7월 1일 차단
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> 제한할 시간 구간(분 단위)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 두 개의 제한 구간: 04:00-08:00 및 12:00-15:00
zones:[4*60,8*60,12*60,15*60] 
zones:"fullday" // 하루 종일 제한
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> 적용할 CSS 클래스 이름</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" // 'gray' CSS 클래스가 적용된 DIV를 그림
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td> 표시할 HTML 콘텐츠 (표시 구간 내)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 표시 구간 위에 이 텍스트가 포함된 DIV를 그림  
html:"<b>Blocked</b>"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td> 시간 구간 유형 지정. 'dhx_time_block'으로 설정하면 차단이 적용됩니다. 그 외 값은 단순 표시만 합니다.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // 시간 구간이 표시되고 차단됨  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> 'zones'에 설정된 시간 구간을 반전할지 여부 (기본값은 false)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 두 개의 제한 구간: 00:00-08:00 및 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// 두 개의 제한 구간: 00:00-08:00 및 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> 특정 뷰 내 특정 항목에만 차단을 제한합니다.<br> 지정된 뷰에서만 날짜가 차단됩니다.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// Unit 뷰에서 id=5인 항목만 차단
// Timeline 뷰에서 id 2, 3인 항목만 차단
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## 설정 속성 조합 허용 범위

:::note

*days*와 *zones*는 함께 사용해야 하며, *start_date*와 *end_date*도 쌍으로 사용해야 차단 구간을 정의할 수 있습니다. 이 쌍들은 다른 방식으로 혼합할 수 없습니다.
예를 들어, *zones*와 *start_date*를 함께 사용하거나, *days*와 *start_date*, *end_date*를 동시에 사용하는 것은 불가능합니다.
 
:::

따라서 두 가지 유효한 속성 조합이 있습니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성 세트 
  </th>
  <th>
  예제
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>
  <ul>
  <li>days</li>
  <li>zones</li>
  <li>invert_zones</li>
  <li>css</li>
  <li>html</li>
  <li>type</li>
  <li>sections</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    days:  1, 
    zones: [9*60, 15*60], 
    css: "cssClassName", 
    sections: {
         unit: 5
    }
}

~~~
</td>
  </tr>
  <tr>
  <td> 
  <ul>
  <li>start_date</li>
  <li>end_date </li>
  <li>css</li>
  <li>html</li>
  <li>type</li>
  <li>sections</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    start_date: new Date(2013,7,13),
    end_date:   new Date(2013,7,14),
    css: "cssClassName",
    sections: {
         unit: 5
    }
}
~~~
</td>
  </tr>
  </tbody>
</table>


## markTimespan()와 addMarkedTimespan() 비교

<table >
<tr><td markdown='1'>
addMarkedTimespan 
</td><td markdown='1'>
markTimespan 
</td></tr>
<tr><td markdown='1'>
시간 구간에 대한 DIV를 렌더링하려면 [updateView](api/method/updateview.md) 호출 필요 
</td><td markdown='1'>
시간 구간에 대한 DIV를 자동으로 그림 
</td></tr>
<tr><td markdown='1'>
시간 구간이 무기한 지속됨 
</td><td markdown='1'>
앱 내 내부 업데이트 후 즉시 시간 구간이 숨겨짐 
</td></tr>
<tr><td markdown='1'>
설정된 시간 구간의 ID를 반환 
</td><td markdown='1'>
DIV 요소 또는 DIV 배열을 반환 
</td></tr>
</table>

### Related API
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [markTimespan](api/method/marktimespan.md)
- [checkInMarkedTimespan](api/method/checkinmarkedtimespan.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
