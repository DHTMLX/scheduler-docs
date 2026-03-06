---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
var alert_opts = [
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

[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 초기화

Select 컨트롤을 라이트박스에 포함하려면 다음 단계를 따릅니다:

1. 섹션을 lightbox 설정에 포함시키기:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. 섹션의 라벨 정의하기:
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  


[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 속성 {#properties}

'select' 컨트롤에서 자주 설정되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

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
  <td>(<i>string</i>) 섹션이 매핑되는 데이터 속성 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션에 사용되는 컨트롤의 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 'select', 'multiselect', 'radio', 'combo'와 같은 컨트롤의 선택 옵션을 정의합니다. 각 객체는 하나의 옵션을 나타내며 다음을 포함합니다: <ul> <li><b>key</b> - (<i>string</i>) 옵션의 식별자, 이벤트의 데이터 속성과 매칭됨</li> <li><b>label</b> - (<i>string</i>) 옵션의 표시 라벨</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 컨트롤의 값이 변경될 때 호출되는 이벤트 핸들러 함수 [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## 컨트롤에 데이터 채우기 {#populating-the-control-with-data}

일반적으로 Select 컨트롤의 값은 [options](api/config/lightbox.md) 파라미터를 사용하여 설정합니다:

~~~js
scheduler.config.lightbox.sections = 
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

[options](api/config/lightbox.md) 배열의 각 항목에는 다음 두 가지 필수 속성이 포함되어야 합니다:

- **key** - 옵션의 식별자
- **label** - 옵션의 표시 라벨

## 옵션을 동적으로 변경하기

서버에서 옵션을 로드하려면 [options](api/config/lightbox.md) 속성에 [serverList](api/method/serverlist.md) 메서드가 반환한 값을 할당합니다:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("./data/types");
~~~

:::note
**serverList** 메서드에 대한 자세한 내용은 [관련 문서](api/method/serverlist.md)를 참고하세요.
:::

[load](api/method/load.md) 메서드의 데이터 응답에는 서버 리스트 이름과 일치하는 컬렉션이 JSON으로 포함되어야 합니다.
[이 예시](guides/data-formats.md#json-with-collections)와 같이 작성할 수 있습니다:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
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


[Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)


[parse](api/method/parse.md) 메서드도 스케줄러가 초기화된 후 옵션을 로드하는 데 사용할 수 있습니다.

컨트롤의 옵션을 새로운 값으로 업데이트하려면 [updateCollection](api/method/updatecollection.md) 메서드를 사용할 수 있습니다:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

자세한 내용은 [scheduler.serverList](api/method/serverlist.md) 문서를 참고하세요.
