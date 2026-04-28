---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

라디오 버튼 모음

![radio_editor](/img/radio_editor.png)

:::note
라이트박스에서 이 컨트롤을 사용하려면 **editors** 확장을 활성화하세요.
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

const priorities = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Medium' },
    { key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"priority", height:58, options:priorities, 
                map_to:"priority", type:"radio", vertical:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[라이트박스의 라디오 버튼 예제](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 초기화

라이트박스에 Radio 컨트롤을 추가하려면 아래 절차를 따르세요:

1. 페이지에서 'editors' 확장을 활성화합니다:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. 라이트박스 구성에 섹션을 추가합니다:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. 섹션의 레이블을 설정합니다:
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~
  

[라이트박스의 라디오 버튼 예제](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 속성

다음 속성은 주로 중요하고 'radio' 컨트롤에 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하십시오):

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
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>for 'select', 'multiselect', 'radio', 'combo' 컨트롤</b>). 배열의 각 객체는 하나의 옵션을 지정하며 다음 속성을 가집니다: <ul> <li><b>key</b> - (<i>string</i>) 옵션의 ID. 이 속성은 이벤트의 데이터 속성과 비교되어 이벤트에 옵션을 할당합니다</li> <li><b>label</b> - (<i>string</i>) 옵션의 레이블</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 라디오 버튼을 수직으로 배치할지 여부를 지정합니다(<i>true</i>인 경우 수직, <b>for the 'multiselect' and 'radio' controls</b>인 경우 수평)</td>
  </tr>
  </tbody>
</table>


## 데이터를 가지고 컨트롤 채우기

일반적으로 라디오 버튼의 값을 설정하려면 [options](api/config/lightbox.md) 매개변수를 사용해야 합니다:

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'High' },
            { key: 2, label: 'Medium' },
            { key: 3, label: 'Low' }
    ]},
    ...
];
~~~

[options](api/config/lightbox.md) 매개변수의 항목은 2개의 필수 속성을 가져야 합니다:

- **key** - (<i>string</i>) 옵션의 ID
- **label** - (<i>string</i>) 옵션의 레이블

## 서버에서 라디오 버튼 값을 가져오기

서버에서 가져온 데이터를 사용하여 라디오 버튼의 값을 설정하려면 [serverList](api/method/serverlist.md) 메서드를 사용하세요:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~


[load](api/method/load.md) 메서드의 데이터 응답은 JSON 형식으로 다음과 같은 서버 목록 이름과 함께 컬렉션을 포함해야 합니다
[다음 형식의 데이터 형식](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~

예시 백엔드 핸들러(Node.js/Express):

~~~js
app.get("/api/types", async (req, res) => {
  const data = await eventsService.list();
  const collections = {
    type: [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" }
    ]
  };
  res.json({ data, collections });
});
~~~

:::note
참고로, 검색된 옵션 목록을 업데이트하려면 [updateCollection](api/method/updatecollection.md) 메서드를 사용할 수 있습니다.
:::


## 라디오 컨트롤의 이벤트 처리

기본적으로 dhtmlxScheduler API는 Scheduler 라이트박스의 라디오 버튼에 대한 특정 이벤트 핸들러를 제공하지 않습니다.

하지만 아래와 같이 Lightbox 라디오 컨트롤에 클릭 핸들러를 할당할 수 있습니다:

1. 라이트박스가 열린 후 라디오 요소를 가져옵니다.

~~~js

scheduler.attachEvent("onLightbox", function(){
    const node = scheduler.formSection("type").node;
    const radios = node.getElementsByTagName("input");
    ...
});
~~~

2. Lightbox의 발견된 라디오 버튼에 <b>onclick</b> 이벤트를 연결합니다.

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(let i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. 마지막으로, 라디오 버튼 클릭 후 실행될 함수를 지정해야 합니다.

~~~js
function onRadioClick(event){
    let e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

관련 샘플 [라디오 컨트롤의 이벤트 처리](https://snippet.dhtmlx.com/5/5b62dd79e)