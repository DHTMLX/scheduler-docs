---
title: "Template"
sidebar_label: "Template"
---

# Template 

HTML 콘텐츠를 담는 컨테이너입니다.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// 섹션의 이름을 설정합니다

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~


## 초기화

Template 컨트롤을 라이트박스에 포함하려면 다음 단계가 필요합니다:
1. 섹션을 라이트박스 설정에 추가:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. 섹션의 레이블 정의:
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. 이벤트를 이용해 컨트롤의 내용을 제공 (예: @[onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트):
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## 속성

'template' 컨트롤에 자주 설정되는 주요 속성들입니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

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
  <td>(<i>string</i>) 이 섹션에 매핑되는 데이터 속성명</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션에서 사용되는 컨트롤의 유형</td>
  </tr>
  </tbody>
</table>
