---
sidebar_label: lightbox
title: "lightbox config"
description: "lightbox 객체를 지정합니다"
---

# lightbox

### Description

@short: 라이트박스 객체를 지정합니다

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
...
scheduler.init('scheduler_here', new Date(2027, 2, 1), "week");
~~~

### Related samples
- [라이트박스의 체크박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [라이트박스의 라디오 버튼](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

라이트박스 객체에는 1개의 속성이 있습니다:

- `sections` - (*array*) 라이트박스 섹션을 지정합니다

~~~js
// default definition
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

**sections** 배열의 각 항목은 다음 속성들을 가질 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 섹션의 이름(이 이름에 따라 스케줄러는 <i>locale.labels</i> 컬렉션에서 섹션의 라벨을 가져옵니다). 예를 들어 <b>'time'</b> 섹션의 경우 스케줄러는 <b>`scheduler.locale.labels.section_time`</b>에 저장된 라벨을 사용합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 섹션의 높이</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' or string</i>) 섹션에 매핑될 데이터 속성의 이름(아래 세부 사항 참조)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션 컨트롤의 유형(에디터)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) 'Time Period' 섹션에서 날짜-시간 컨트롤의 순서를 설정</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) <i>true</i>로 설정되면 라이트박스 열 때 해당 섹션이 포커스를 받습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) 섹션 컨트롤의 기본값</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 섹션 컨트롤의 'onChange' 이벤트 핸들러 함수 지정 (<b>선택 컨트롤에 한해</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>for 'select', 'multiselect', 'radio', 'combo' 컨트롤</b>).<br> 배열의 각 객체는 단일 옵션을 지정하며 다음 속성을 가집니다:<ul><li><b>key</b> - (<i>string</i>) 옵션의 id. 이 속성은 이벤트의 데이터 속성과 비교하여 옵션을 이벤트에 할당합니다</li><li><b>label</b> - (<i>string</i>) 옵션의 라벨</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 라디오 버튼을 수직으로 배치할지 여부(<i>true</i> 또는 <i>false</i>) (<b>for the 'select' control only</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 체크된 상태의 값. Optional. 기본값은 <i>true</i> (<b>for the 'checkbox' control only</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 체크 해제된 상태의 값. Optional. 기본값은 <i>false</i> (<b>for the 'checkbox' control only</b>)</td>
  </tr>
  </tbody>
</table>

## 의미: `map_to: "auto"`

`map_to` 속성은 `"auto"` 값을 가질 수 있습니다. `"auto"` 값은 다음과 관련이 있습니다:

- 컨트롤은 값을 반환하지 않으며, [Custom Lightbox Control](guides/custom-lightbox-editor.md) 메서드에 따라 관련 이벤트의 속성 값을 직접 변경합니다.
- 일반적으로, `"auto"` 값은 이벤트의 여러 속성으로 작동하는 복합 컨트롤에 사용됩니다.

### Related Guides
- [Fully Custom Lightbox](guides/custom-details-form.md)