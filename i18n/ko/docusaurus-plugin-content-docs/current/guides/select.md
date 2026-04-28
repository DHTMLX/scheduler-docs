---
title: "Select"
sidebar_label: "Select"
---

# Select 

![선택 편집기](/img/select_editor.png)

~~~js
const alert_opts = [
    { key: 1, label: 'None' },
    { key: 2, label: 'On start date' },
    { key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~             

[라이트박스에서의 기본 선택 편집기](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 초기화

Select 컨트롤을 라이트박스에 추가하려면 아래 절차를 따르세요:

1. <b>라이트박스 구성에 섹션을 추가:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~ 
2. <b>섹션의 레이블 설정:</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  



[라이트박스에서의 기본 선택 편집기](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 속성

다음 속성들은 주로 'select' 컨트롤에 대해 중요하고 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>문자열</i>) 섹션의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>숫자</i>) 섹션의 높이</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>문자열</i>) 섹션에 매핑될 데이터 속성의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션 컨트롤의 유형</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>객체 배열</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>select, multiselect, radio, combo 컨트롤에 해당</b>). 배열의 각 객체는 하나의 옵션을 지정하며 다음 속성을 갖습니다: <ul> <li><b>key</b> - (<i>문자열</i>) 옵션의 ID. 이 속성은 이벤트의 데이터 속성과 비교하여 이벤트에 옵션을 할당합니다</li> <li><b>label</b> - (<i>문자열</i>) 옵션의 레이블</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>함수</i>) 섹션 컨트롤의 'onchange' 이벤트 핸들러 함수를 지정합니다 [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## 데이터로 컨트롤 채우기

일반적으로 Select 컨트롤의 값을 설정하려면 [options](api/config/lightbox.md) 매개변수를 사용해야 합니다:

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'None'},
            { key: 2, label: 'On start date'},
            { key: 3, label: '1 day before'}
    ]},
    ...
];
~~~


[options](api/config/lightbox.md) 매개변수의 항목은 2개의 필수 속성을 가져야 합니다:

- **key** - 옵션의 아이디
- **label** - 옵션의 레이블

## 동적으로 옵션 변경

서버에서 컨트롤의 옵션을 채우려면 [options](api/config/lightbox.md) 옵션을 [serverList](api/method/serverlist.md) 메서드가 반환하는 값으로 설정하세요:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~ 

:::note
The details on the **serverList** method are given in the [related article](api/method/serverlist.md).
:::

load 메서드의 데이터 응답은 JSON 형식으로 서버 목록 이름이 지정된 컬렉션을 포함해야 합니다 [다음 형식의 예시를 참조](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":"2"
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":"1","label":"Interview"},/*!*/
         {"value":"2","label":"Performance review"},/*!*/
         {"value":"3","label":"Request"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~


The [parse](api/method/parse.md) 메서드는 초기화 이후 옵션을 불러와야 하는 경우에도 사용할 수 있습니다.

지정된 옵션을 새 값으로 업데이트해야 하는 경우에는 [updateCollection](api/method/updatecollection.md) 메서드를 사용할 수 있습니다:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

자세한 내용은 [scheduler.serverList](api/method/serverlist.md) 문서를 참고하십시오.