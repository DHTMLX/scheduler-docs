---
sidebar_label: "blockTime"
title: "blockTime method"
description: "지정된 날짜를 차단하고 기본 'dimmed' 스타일을 적용합니다."
---

# blockTime
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 지정된 날짜를 차단하고 기본 'dimmed' 스타일을 적용합니다.

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - 차단할 날짜 (숫자가 제공되면 주중으로 처리됩니다. <br> '0'은 일요일, '6'은 토요일을 의미)
- `time_points` - (required) *array* - <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b> 형식의 배열, <br> 각 쌍은 시간 범위를 정의합니다. 배열에는 여러 쌍이 포함될 수 있습니다.
- `items` - (optional) *object* - 차단할 특정 뷰 항목을 지정합니다.

### Example

~~~jsx
//매주 수요일 자정부터 오전 8시까지 이벤트 차단 
//단, Units 뷰에서 id=1, id=4인 항목에만 적용
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

이 메서드는 여러 방식으로 사용할 수 있습니다:


~~~js
//2009년 5월 3일 하루 전체 차단
scheduler.blockTime(new Date(2009,5,3), "fullday");

//2009년 6월 3일 자정부터 오전 10시까지 이벤트 차단
scheduler.blockTime(new Date(2009,6,3), [0,10*60]);

//매주 토요일 자정부터 오전 8시, 오후 6시부터 자정까지 이벤트 차단
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//매주 일요일 모든 이벤트 차단
scheduler.blockTime(0, "fullday");

//매주 수요일 자정부터 오전 8시까지 이벤트 차단
//단, Units 뷰에서 id=1, id=4인 항목에만 적용
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//위와 동일하지만 파라미터를 설정 객체로 전달
scheduler.blockTime({
    days: 3,
    zones: [0,8*60],
    sections: {
        unit: [1,4]
    }
});

~~~

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
//2012년 5월 3일부터 'end_date'까지 이벤트 생성 방지
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 제한이 종료되는 시점을 정의하는 Date 객체</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//'start_date'부터 2012년 9월 3일까지 이벤트 생성 방지
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> 차단할 요일</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //일요일, 화요일, 토요일 차단
days:"fullweek" //일주일 전체 차단
days:new Date(2012,6,1) //2012년 7월 1일 차단
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> 차단할 시간 구간(분 단위)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] //두 개의 차단 구간: 04:00-08:00, 12:00-15:00
zones:"fullday" //하루 전체 차단
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
css:"gray" //'gray' CSS 클래스가 적용된 DIV 추가
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>'zones'로 정의된 시간 구간을 반전할지 여부 (기본값 false)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//두 개의 차단 구간: 00:00-08:00 및 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//두 개의 차단 구간: 00:00-08:00 및 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> 특정 뷰 내 특정 항목에 대해서만 날짜를 차단할 수 있습니다.<br> 지정된 날짜는 해당 뷰에서만 차단됩니다.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//Units 뷰에서 id=5인 항목만 날짜 차단
//Timeline 뷰에서 id=2, id=3인 항목만 날짜 차단
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- v5.1부터 deprecated 되었습니다.
