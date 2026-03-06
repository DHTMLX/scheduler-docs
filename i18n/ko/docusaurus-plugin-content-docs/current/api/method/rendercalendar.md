---
sidebar_label: "renderCalendar"
title: "renderCalendar method"
description: "컴팩트한 캘린더를 생성합니다"
---

# renderCalendar

### Description

@short: 컴팩트한 캘린더를 생성합니다

@signature: renderCalendar: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - 캘린더 설정을 위한 구성 객체

### Returns
- ` div` - (HTMLElement) - 캘린더의 HTML 요소

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date, calendar){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)

### Details

:::note
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
::: 

구성 객체는 다음과 같은 속성을 포함할 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>container</b></td>
  <td>(<i>string, object</i>) 캘린더가 배치될 HTML 컨테이너(또는 해당 ID)입니다. 선택 사항입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>position</b></td>
  <td>(<i>object</i>) 캘린더의 위치를 지정합니다. 좌표값이나 HTML 요소의 ID로 지정할 수 있습니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>string</i>) 캘린더에 처음 표시할 날짜를 설정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>navigation</b></td>
  <td>(<i>boolean</i>) 월 이동 버튼의 표시 여부를 토글합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>handler</b></td>
  <td>(<i>function</i>) 날짜 클릭 시 호출되는 콜백 함수입니다. 클릭된 날짜와 캘린더 인스턴스를 인자로 받습니다.</td>
  </tr>
  </tbody>
</table>

~~~js
const calendar = scheduler.renderCalendar({
    container:"for_calendar",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position:"some_id",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position: { left: 100, top: 50 },
    date:new Date()
});

~~~

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
