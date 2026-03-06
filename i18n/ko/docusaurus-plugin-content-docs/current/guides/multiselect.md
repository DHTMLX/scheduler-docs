---
title: "Multiselect"
sidebar_label: "Multiselect"
---

# Multiselect 

이 컨트롤은 체크박스 그룹을 제공합니다.

![multiselect_editor](/img/multiselect_editor.png)

:::note
라이트박스에서 이 컨트롤을 사용하려면 **multiselect** 확장을 반드시 활성화해야 합니다.
:::

~~~js
scheduler.plugins({
    multiselect: true /*!*/
});

scheduler.locale.labels.section_userselect = "참여자";
 
scheduler.config.lightbox.sections="["    
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## 초기화

Multiselect 컨트롤을 라이트박스에 포함하려면 다음 단계를 완료하세요:

1. 페이지에서 'multiselect' 확장을 활성화하세요:
~~~js
scheduler.plugins({
    multiselect: true
});
~~~
2. 라이트박스 설정에 multiselect 섹션을 추가하세요:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"), vertical:false },
    { name:"time", ...}
];
~~~
3. 섹션의 라벨을 정의하세요:
~~~js
scheduler.locale.labels.section_userselect = "참여자";
~~~
  

[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## 속성 {#properties}

'Multiselect' 컨트롤에서 자주 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인하세요):

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
  <td>(<i>string</i>) 이 섹션에 매핑되는 데이터 속성 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션에 사용되는 컨트롤 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>'select', 'multiselect', 'radio', 'combo' 컨트롤에 적용</b>). 각 객체는 다음 속성을 가진 단일 옵션을 나타냅니다: <ul> <li><b>key</b> - (<i>string</i>) 옵션의 ID. 이벤트의 데이터 속성과 매칭되어 이벤트에 옵션을 할당합니다.</li> <li><b>label</b> - (<i>string</i>) 옵션의 표시 라벨</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_url</b></td>
  <td>(<i>string</i>) multiselect 옵션을 동적으로 로드하는 서버 측 스크립트의 URL. 선택 사항이며 동적 모드에서만 사용됩니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) multiselect 버튼이 수직(<i>true</i>) 또는 수평(<b>'multiselect', 'radio' 컨트롤에 적용</b>)으로 배치될지 여부를 결정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>delimiter</b></td>
  <td>(<i>string</i>) multiselect 값들을 구분하는 구분자를 정의합니다. 지정하지 않으면 전역 [section_delimiter](api/config/section_delimiter.md) 설정이 적용됩니다.</td>
  </tr>
  </tbody>
</table>

## 컨트롤에 데이터 채우기

일반적으로 multiselect 버튼의 값은 [options](api/config/lightbox.md) 파라미터를 통해 설정합니다:

~~~js
scheduler.config.lightbox.sections = 
    {   name:"userselect", type:"multiselect", 
        ...
        options:[
            { key: 1, label: 'George' },
            { key: 2, label: 'Nataly' },
            { key: 3, label: 'Diana' },
            { key: 4, label: 'Adam' }
    ]},
    ...
];
~~~

[options](api/config/lightbox.md) 배열의 각 항목에는 다음 두 가지 필수 속성이 포함되어야 합니다:

- **key** - 옵션의 고유 ID
- **label** - 옵션에 표시되는 텍스트 라벨

## 서버에서 체크박스 값 불러오기

체크박스 값을 서버에서 가져오려면 [serverList](api/method/serverlist.md) 메서드를 사용하세요:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    {name:"time", ...}
];

scheduler.load("api/data");
~~~

여기서 **api/data**는 [서버 측 스크립트](guides/server-integration.md)로, multiselect 버튼의 이벤트 및 옵션을 모두 반환하며, ["데이터 포맷 예시"](guides/data-formats.md#json-with-collections)에 설명된 형식으로 데이터를 제공합니다:

~~~js
//response
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"dblclick me!",
          "user_id":"1,2"
      },
      {
          "id":"2",
          "start_date":"2019-03-09 00:00:00",
          "end_date":"2019-03-11 00:00:00",
          "text":"and me!",
          "user_id":"2,3"
      }
   ], 
   "collections": {                         
      "users":[                          
         {"value":"1","label":"Lisa"},    
         {"value":"2","label":"Bob"},   
         {"value":"3","label":"Mike"}    
      ]                                     
   }                                        
}
~~~

:::note
[updateCollection](api/method/updatecollection.md) 메서드를 사용하여 옵션 목록을 동적으로 업데이트할 수도 있습니다.
:::

~~~js
var oldOptions = scheduler.serverList("users").slice();
scheduler.updateCollection("users", [
         {"value":"4","label":"John"},    
         {"value":"5","label":"Paul"},   
         {"value":"6","label":"Ringo"},   
         {"value":"7","label":"George"}
]);
~~~


## 동적 로딩

정적 모드에서는 모든 이벤트 파라미터 옵션이 데이터베이스의 별도 필드에 저장됩니다. 이는 더 유연한 로직 구현이 가능하지만 모든 옵션을 불러오기 위해 추가 쿼리가 필요합니다.
  
동적 모드에서는 옵션이 필요할 때만 로드됩니다. 쿼리 수가 줄어들지만, 커스텀 로직 구현에 제약이 있습니다.

서버 측에서는 다음과 유사한 코드가 필요합니다.

동적 모드를 활성화하려면 **options**와 함께 **script_url** 속성을 포함하세요:

~~~js
scheduler.config.lightbox.sections = [
    {name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"),
    script_url:'api/options'},
    ...
];
~~~

`api/options` 엔드포인트는 다음과 같은 JSON 데이터를 반환해야 합니다:

~~~js
[                          
    {"value":"1","label":"Lisa"},    
    {"value":"2","label":"Bob"},   
    {"value":"3","label":"Mike"}    
]
~~~
