---
title: "Textarea"
sidebar_label: "Textarea"
---

# Textarea

여러 줄 입력이 가능한 텍스트 입력 필드입니다.

![textarea_editor](/img/textarea_editor.png)

~~~js
scheduler.locale.labels.section_text = 'Text';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 초기화

기본적으로 lightbox에는 하나의 Textarea 컨트롤이 포함되어 있습니다. 추가로 Textarea를 하나 더 추가하려면 아래 단계를 따르세요:
1. 새 섹션을 lightbox 설정에 포함시키세요:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"location", height:50, map_to:"location", type:"textarea"},
    { name:"time", ...}
];
~~~
2. 새 섹션의 라벨을 정의하세요:
~~~js
scheduler.locale.labels.section_location = "Location";
~~~

  


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## 속성

'textarea' 컨트롤에서 자주 사용되는 주요 속성들은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 섹션의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 섹션의 높이</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 해당 섹션과 연결된 데이터 속성 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션의 컨트롤 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>placeholder</b></td>
  <td>(<i>string</i>) textarea가 비어 있을 때 표시되는 플레이스홀더 텍스트</td>
  </tr>
  </tbody>
</table>
