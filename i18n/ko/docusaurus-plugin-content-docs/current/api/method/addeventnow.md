---
sidebar_label: "addEventNow"
title: "addEventNow method"
description: "새 이벤트를 생성하고 확인을 위한 라이트박스를 엽니다."
---

# addEventNow

### Description

@short: 새 이벤트를 생성하고 확인을 위한 라이트박스를 엽니다.

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *object* - 이벤트 세부 정보 객체

### Returns
- ` id` - (string) - 이벤트의 고유 식별자

### Example

~~~jsx
scheduler.addEventNow();
//또는
scheduler.addEventNow({
    start_date: new Date(2027,0,10,8,30),
    end_date:     new Date(2027,0,10,10,30),
    text:    "Meeting",
    holder:    "John", //userdata
    room:    "5"     //userdata
});
~~~

### Related samples
- [Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)

### Details

이벤트 객체는 다음과 같은 속성을 지원합니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) 이벤트의 시작 날짜 및 시간입니다. 기본값은 현재 날짜 및 시간입니다. <br> <br> 문자열로 제공될 경우 '%d-%m-%Y %H:%i' 형식을 따라야 합니다.
  (이 형식은 [api_date](api/config/api_date.md) 옵션을 통해 변경할 수 있습니다)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) 이벤트의 종료 날짜 및 시간입니다. 기본값은 현재 날짜에 [time_step](api/config/time_step.md)의 값을 더한 시간입니다. <br> <br> 문자열로 제공될 경우,
  '%d-%m-%Y %H:%i' 형식을 따라야 하며 ([api_date](api/config/api_date.md) 옵션을 통해 수정 가능) </td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) 이벤트의 제목 또는 설명</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) 이벤트의 고유 식별자입니다. 생략 시 자동으로 id가 생성됩니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) 키-값 쌍으로 표현되는 사용자 정의 속성 집합</td>
  </tr>
  </tbody>
</table>

<br>

### Related API
- [api_date](api/config/api_date.md)
- [time_step](api/config/time_step.md)
- [addEvent](api/method/addevent.md)

### Related Guides
- ["이벤트 추가/삭제"](guides/adding-events.md)
