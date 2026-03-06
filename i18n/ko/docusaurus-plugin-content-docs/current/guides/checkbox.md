---
title: "Checkbox"
sidebar_label: "Checkbox"
---

# Checkbox 

간단한 2-상태 체크박스입니다.

![checkbox_editor](/img/checkbox_editor.png)

~~~js        
scheduler.locale.labels.section_checkme = "참여하겠습니다";     
            
scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"checkme", map_to:"participation", type:"checkbox", 
    checked_value: "registrable", unchecked_value: "unchecked", height:40 },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## 초기화

라이트박스에 Checkbox 컨트롤을 포함하려면 다음 단계를 따라야 합니다:

1. 페이지에서 **editors** 익스텐션을 활성화하세요:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. 라이트박스 설정에 checkbox 섹션을 추가하세요:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"checkme", map_to:"single_checkbox", type:"checkbox", 
    checked_value: "registrable", height:40},
    { name:"time", ...}
];
~~~
3. checkbox 섹션의 라벨을 정의하세요:
~~~js
scheduler.locale.labels.section_checkme = "참여하겠습니다"; 
~~~
  

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## 속성

'checkbox' 컨트롤에 일반적으로 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)를 참고하세요):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 섹션의 식별자</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 섹션의 높이</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 이 섹션에 연결된 데이터 속성</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션의 컨트롤 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 선택되었을 때 할당되는 값. 선택 사항이며 기본값은 <i>true</i>입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) 체크박스가 선택 해제되었을 때 할당되는 값. 선택 사항이며 기본값은 <i>false</i>입니다.</td>
  </tr>
  </tbody>
</table>
