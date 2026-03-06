---
sidebar_label: "markTimespan"
title: "markTimespan method"
description: "기본 스타일이나 사용자 정의 스타일을 적용하여 특정 날짜를 하이라이트하거나 차단합니다. 하이라이트는 앱 내에서 내부 업데이트가 발생하면 즉시 제거됩니다. 특정 날짜를 강조할 때 유용합니다."
---

# markTimespan

### Description

@short: 기본 스타일이나 사용자 정의 스타일을 적용하여 특정 날짜를 하이라이트하거나 차단합니다. 하이라이트는 앱 내에서 내부 업데이트가 발생하면 즉시 제거됩니다. 특정 날짜를 강조할 때 유용합니다.

@signature: markTimespan: (config: any) =\> any[]

### Parameters

- `config` - (required) *object* - 마크하거나 차단할 timespan에 대한 구성 세부정보

### Returns
- ` divs` - (array) - HTML 요소 배열을 반환합니다

### Example

~~~jsx
//특정 날짜 하이라이트
scheduler.markTimespan({  
    days:  5,               // 매주 금요일 하이라이트  
    zones: "fullday",       // 하루 종일 하이라이트
    css:   "gray_section"   // 적용할 CSS 클래스
});

//특정 날짜 하이라이트 및 차단
scheduler.markTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" // timespan을 차단하기 위한 고정 값
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

 이 메서드는 버전 3.5부터 사용할 수 있습니다.
 
:::

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

## 구성 객체 속성

구성 객체는 다음 속성을 지원합니다:

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
  <td> 제한이 시작되는 시점을 지정하는 Date 객체</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 2012년 5월 3일부터 'end_date'까지 이벤트 생성 방지
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 제한이 끝나는 시점을 지정하는 Date 객체</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 'start_date'부터 2012년 9월 3일까지 이벤트 생성 방지
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
days:"fullweek" // 일주일 전체 제한
days:new Date(2012,6,1) // 2012년 7월 1일 차단
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> 제한할 시간대(분 단위)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] // 두 개의 제한 구간: 04:00-08:00, 12:00-15:00
zones:"fullday" // 하루 종일 제한
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> 적용할 CSS 클래스 이름 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" // 'gray' CSS 클래스가 적용된 DIV 생성
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td> 마크된 범위 내에 표시할 HTML 콘텐츠 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
html:"<b>Blocked</b>" // 마크된 범위의 DIV 안에 이 텍스트 추가  
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td> timespan의 유형을 지정합니다. 'dhx_time_block'으로 설정하면 timespan이 차단됩니다. 다른 값은 차단 없이 마크만 수행합니다 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // timespan을 마크하고 차단  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> 'zones'로 설정한 시간대를 반전할지 여부를 결정합니다 (기본값은 false) </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 두 개의 제한 구간: 00:00-08:00, 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// 두 개의 제한 구간: 00:00-08:00, 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> 특정 뷰 내 특정 아이템에 대해 차단을 제한합니다. 차단은 해당 관련 뷰 내에서만 적용됩니다</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// Units 뷰에서 id=5 아이템만 날짜 차단
// Timeline 뷰에서 id가 2, 3인 아이템만 차단
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## 허용 가능한 config 속성 조합

:::note

*days*, *zones* 와 *start_date*, *end_date*는 차단 구간을 정의하기 위해 쌍으로 사용되며 다른 방식으로 혼용해서는 안 됩니다.
예를 들어, *zones*를 *start_date*와 함께 사용할 수 없고 *days*를 *start_date*와 *end_date* 모두와 동시에 사용할 수 없습니다.
 
:::

사용할 수 있는 유효한 속성 세트는 두 가지입니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성 세트 
  </th>
  <th>
  예시
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
    start_date: new Date(2012,7,13),
    end_date:   new Date(2012,7,14),
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
timespan에 대한 DIV를 렌더링하기 위해 [updateView](api/method/updateview.md) 메서드 호출이 필요 
</td><td markdown='1'>
timespan에 대한 DIV를 자동으로 렌더링 
</td></tr>
<tr><td markdown='1'>
timespan이 영구적으로 표시됨 
</td><td markdown='1'>
앱 내에서 내부 업데이트가 발생하면 timespan이 즉시 숨겨짐 
</td></tr>
<tr><td markdown='1'>
생성된 timespan의 ID를 반환 
</td><td markdown='1'>
DIV 또는 DIV 배열을 반환 
</td></tr>
</table>

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
