---
title: "Combo"
sidebar_label: "Combo"
---

# Combo

이 섹션에서는 <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo component</a>에서 제공하는 콤보 박스에 대해 설명합니다.

![combo_editor](/img/combo_editor.png)

~~~js
const holders = [
    { key: 1, label: 'James' },
    { key: 2, label: 'Alex' },
    { key: 3, label: 'Antony' },
    { key: 4, label: 'Andrew' }
];
            
scheduler.locale.labels.section_holder = "Holder";

scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 초기화

콤보 컨트롤을 라이트박스에 추가하려면 다음 단계를 따르세요:

1. <b><a href="https://docs.dhtmlx.com/combo__index.html">dhtmlxCombo</a> 파일 포함:</b>
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. <b>페이지에서 [editors] 확장 활성화</b>:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. <b>라이트박스 구성에 섹션 추가:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. <b>섹션의 라벨 설정</b>:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~



[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 속성

다음 속성은 주로 중요하고 'combo' 컨트롤에 일반적으로 설정됩니다(전체 목록은 여기에서 확인하십시오): 

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
  <td>(<i>객체 배열</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>'select', 'multiselect', 'radio', 'combo'</b> 컨트롤에 해당). 배열의 각 객체는 단일 옵션을 지정하며 다음 속성을 가집니다: <ul> <li><b>key</b> - (<i>string</i>) 옵션의 id. 이 속성은 이벤트의 데이터 속성과 비교하여 옵션을 이벤트에 매핑합니다</li> <li><b>label</b> - (<i>string</i>) 옵션의 레이블</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) dhtmlxCombo 이미지의 경로</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) 자동 필터링 지원을 활성화합니다(타이핑으로 옵션이 필터링됩니다). 선택적 매개변수는 다음 값 중 하나를 가질 수 있습니다: <ul> <li><b>false</b> - 필터링 비활성</li> <li><b>true 또는 "start"</b> - 필터링 활성, 항목의 시작 부분에서 검색 수행</li> <li><b>"between"</b> - 필터링 활성, 입력한 텍스트가 항목의 어느 위치에나 나타날 때 검색</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) 서버 측 스크립트의 경로로, 서버에서 콤보의 옵션을 로드하는 데 사용됩니다. 선택적</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) 스크립트 응답의 캐시를 활성화/비활성화합니다(속성 활성화 권장). 선택적</td>
  </tr>
  </tbody>
</table>


## 데이터를 사용해 컨트롤 채우기

일반적으로 Combo 컨트롤에 값을 설정하려면 [options] 매개변수를 사용해야 합니다:

~~~js
scheduler.config.lightbox.sections = 
    { 
        name:"holders", type:"combo", 
        ...
        options:[
            { key: 1, label: 'James' },
            { key: 2, label: 'Alex' },
            { key: 3, label: 'Antony' },
            { key: 4, label: 'Andrew' }
    ]},
    ...
];
~~~

[options](api/config/lightbox.md) 매개변수의 항목은 2개의 필수 속성을 가져야 합니다:

- **key** - 옵션의 id
- **label** - 옵션의 레이블

## 서버로부터 데이터로 컨트롤 채우기

서버에서 Combo 컨트롤을 채우려면 **script_path** 속성을 사용하고, 서버 요청을 처리할 서버 측 스크립트의 경로를 지정합니다.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

**script_path** 속성은 콤보가 옵션을 로드하는 URL을 지정하며, 즉 script_path가 지정되면 콤보는 AJAX를 통해 해당 URL에서 데이터를 로드하려고 합니다.

콤보 선택기는 [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html)을 기반으로 하므로, 서버는 해당 형식과 호환되는 데이터를 반환해야 합니다.
콤보에 데이터를 추가하는 방법에 대해서는 [Loading Options] 문서를 참조하십시오. 

URL은 두 가지 경우에 요청됩니다:

1) 라이트박스가 열리고 콤보에 선택된 값이 있을 때 - 컨트롤은 서버에 요청을 보내 선택된 옵션의 레이블을 로드합니다.

요청에는 **id** 쿼리 매개변수가 포함됩니다:

~~~ 
GET /url?id="1"
~~~

응답은 다음 형식으로 지정된 id를 가진 항목만 포함하는 배열을 반환해야 합니다:

~~~ 
[
   { "value": 1, "text": "Marketing"}
]
~~~

2) 사용자가 선택 상자 입력에 텍스트를 입력하기 시작하면 컨트롤은 필터링된 값을 로드합니다.

클라이언트는 쿼리의 **mask** 매개변수에 입력한 텍스트를 포함하여 요청을 보냅니다:

~~~ 
GET /url?mask="al"
~~~

서버 응답은 마스크 값과 일치하는 모든 항목을 반환해야 합니다:

~~~ 
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

백엔드 핸들러 예시(Node.js/Express):

~~~js
app.get("/api/countries", async (req, res) => {
  const { id, mask } = req.query;
  // Query your data source by id or mask
  const items = await countriesService.find({ id, mask });
  res.json(items); // [{ value: 1, text: "Albania" }, ...]
});
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## 자동 필터링 모드

자동 필터링 모드는 사용자가 입력할 때 옵션이 자동으로 필터링되는 모드입니다. 모드를 활성화하려면 **filtering** 속성을 true로 설정합니다:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
참고: 데이터의 출처(client 또는 server-side)에 관계없이 자동 필터링 모드를 사용할 수 있습니다.
:::

주제에 대한 자세한 내용은 dhtmlxCombo 문서 <a href="https://docs.dhtmlx.com/combo__filtering.html">dhtmlxCombo. Filtering</a>를 참조하십시오.