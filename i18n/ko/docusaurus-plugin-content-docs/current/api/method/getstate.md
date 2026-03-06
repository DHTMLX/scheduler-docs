---
sidebar_label: "getState"
title: "getState method"
description: "스케줄러의 현재 상태를 가져옵니다."
---

# getState

### Description

@short: 스케줄러의 현재 상태를 가져옵니다.

@signature: getState: () =\> any

### Returns
- `state` - (object) - 상태 객체

### Example

~~~jsx
var mode = scheduler.getState().mode;
if(mode == "day"){
    // 여기에 커스텀 로직 작성
}
else {
    // 여기에 커스텀 로직 작성
}
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

상태 객체는 스케줄러의 내부 UI 구성을 나타내며, 다음과 같은 속성들을 포함합니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>mode</b></td>
  <td>(<i>string</i>) 현재 활성화된 뷰</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>Date</i>) 선택된 날짜</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>min_date</b></td>
  <td>(<i>Date</i>) 현재 뷰에서 이벤트가 표시되기 시작하는 시작 날짜</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>max_date</b></td>
  <td>(<i>Date</i>) 현재 뷰에서 이벤트가 표시되는 종료 날짜</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>editor_id</b></td>
  <td>(<i>string</i>) 현재 인라인으로 편집 중인 이벤트의 ID. 인라인 편집 중인 이벤트가 없으면 'undefined' 또는 'null'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>lightbox_id</b></td>
  <td>(<i>string</i>) 현재 라이트박스에서 열려 있는 이벤트의 ID. 라이트박스에 이벤트가 열려 있지 않으면 'undefined' 또는 'null'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>new_event</b></td>
  <td>(<i>Date</i>) 현재 새 이벤트가 생성 중인지 여부를 나타냅니다. 새 이벤트가 생성 중이면 해당 날짜를, 그렇지 않으면 'undefined' 또는 'null'을 가집니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select_id</b></td>
  <td>(<i>string</i>) 현재 선택된 이벤트의 ID. 이벤트가 선택되지 않은 경우 'undefined' 또는 'null'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>expanded</b></td>
  <td>(<i>boolean</i>) 스케줄러가 확장된 상태일 때 true입니다. 스케줄러가 일반 크기이거나 [expand](guides/extensions-list.md#expand) 확장이 활성화되어 있지 않으면 'undefined' 또는 'null'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_id</b></td>
  <td>(<i>string</i>) 현재 드래그 중인 이벤트의 ID. 이벤트가 드래그 중이 아니면 'undefined' 또는 'null'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_mode</b></td>
  <td>(<i>'move','resize','create', 'new-size'</i>) 현재 드래그 모드. 이벤트가 드래그 중이 아니면 'undefined' 또는 'null'입니다.</td>
  </tr>
  </tbody>
</table>

:::note

참고: 이 객체를 변경해도 스케줄러의 동작에는 영향을 주지 않습니다.
 
:::

