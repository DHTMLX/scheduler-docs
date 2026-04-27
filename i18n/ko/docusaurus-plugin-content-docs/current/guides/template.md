---
title: "Template"
sidebar_label: "Template"
---

# Template 

일부 HTML 콘텐츠가 들어 있는 컨테이너.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// 섹션의 이름을 설정합니다

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~

## 초기화

템플릿 컨트롤을 라이트박스에 추가하려면 다음 단계를 따르세요:
1. <b>라이트박스 구성에 섹션을 추가:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. <b>섹션의 레이블을 설정:</b>
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. <b>일부 이벤트의 도움으로 컨트롤의 내용을 설정합니다. 예: [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트:</b>
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## 속성

다음 속성은 주로 및 일반적으로 'template' 컨트롤에 대해 중요하게 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하세요):

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
  <td>(<i>string</i>) 섹션에 매핑될 데이터 속성의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션 컨트롤의 유형</td>
  </tr>
  </tbody>
</table>