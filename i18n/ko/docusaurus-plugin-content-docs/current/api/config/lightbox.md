---
sidebar_label: "lightbox"
title: "lightbox config"
description: "lightbox 객체를 지정합니다"
---

# lightbox

### Description

@short: Lightbox 객체를 지정합니다

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections=[    
    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
    { name:"location",    height:43, type:"textarea", map_to:"event_location"},
    { name:"time",           height:72, type:"time",     map_to:"auto"}    
];
...            
scheduler.init('scheduler_here',new Date(2027,2,1),"week");
~~~

### Related samples
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

lightbox 객체는 하나의 주요 속성을 포함합니다:

- **sections** - (*array*) lightbox에 표시될 섹션들을 정의합니다

~~~js
//기본 정의
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
~~~

**sections** 배열의 각 항목은 다음 속성들을 가질 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 스케줄러가 <i>locale.labels</i> 컬렉션에서 해당 섹션의 레이블을 가져오기 위해 사용하는 섹션 이름입니다. 예를 들어, <b>'time'</b> 섹션의 레이블은 <b>scheduler.locale.labels.section_time</b>에서 찾습니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 섹션의 높이</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' 또는 string</i>) 섹션에 연결된 데이터 속성 이름 (아래 상세 설명)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션에서 사용되는 컨트롤 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) 'Time Period' 섹션 내 날짜 및 시간 컨트롤의 순서를 정의합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) <i>true</i>로 설정하면 lightbox가 열릴 때 해당 섹션이 포커스를 받습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) 섹션 내 컨트롤의 기본값</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 컨트롤의 'onChange' 이벤트 핸들러 (<b>'select' 컨트롤에만 해당</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>객체 배열</i>) <b>'select', 'multiselect', 'radio', 'combo'</b> 같은 컨트롤의 선택 옵션을 정의합니다.<br> 배열 내 각 객체는 옵션을 나타내며 다음 속성을 가집니다:<ul><li><b>key</b> - (<i>string</i>) 옵션의 ID로, 이벤트 데이터 속성과 매칭하는 데 사용됩니다</li><li><b>label</b> - (<i>string</i>) 옵션의 표시 레이블</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 라디오 버튼이 수직(<i>true</i>) 또는 수평(<i>false</i>)으로 배치되는지 결정합니다 (<b>'select' 컨트롤에만 해당</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 선택되었을 때 할당되는 값입니다. 선택 사항이며 기본값은 <i>true</i>입니다 (<b>'checkbox' 컨트롤에만 해당</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 선택 해제되었을 때 할당되는 값입니다. 선택 사항이며 기본값은 <i>false</i>입니다 (<b>'checkbox' 컨트롤에만 해당</b>)</td>
  </tr>
  </tbody>
</table>

## 'map_to:"auto"'는 무엇을 의미하나요?

'map_to' 속성이 'auto'로 설정되면:

- 컨트롤 자체가 값을 반환하지 않고, 대신 'set_value()' 메서드를 통해 이벤트의 속성을 직접 업데이트합니다 (자세한 내용은 ["Custom Lightbox Control"](guides/custom-lightbox-editor.md) 참고).
- 이는 보통 여러 이벤트 속성을 동시에 처리하는 복잡한 컨트롤에 사용됩니다.

### Related Guides
- ["완전히 커스텀된 라이트박스"](guides/custom-details-form.md)
