---
title: "Combo"
sidebar_label: "Combo"
---

# Combo

이 섹션에서는 <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo component</a>에서 제공하는 콤보 박스에 대해 설명합니다.

![combo_editor](/img/combo_editor.png)

~~~js
var holders = [
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

라이트박스에 Combo 컨트롤을 추가하려면 다음 단계를 따르세요:

1. dhtmlxCombo 파일 포함:
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. 페이지에서 editors 확장 기능 활성화:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. 라이트박스 구성에 섹션 추가:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. 섹션의 라벨 설정:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

  


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 속성

'combo' 컨트롤에서 자주 사용되는 주요 속성은 아래와 같습니다. (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

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
  <td>(<i>string</i>) 섹션과 매핑될 데이터 속성의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 섹션 컨트롤의 타입</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 컨트롤의 선택 옵션을 정의합니다 (<b>'select', 'multiselect', 'radio', 'combo' 컨트롤에 사용</b>). 배열의 각 객체는 하나의 옵션을 나타내며, 다음 속성을 가집니다: <ul> <li><b>key</b> - (<i>string</i>) 옵션의 id. 이 속성은 이벤트의 데이터 속성과 비교되어 이벤트에 옵션을 할당합니다</li> <li><b>label</b> - (<i>string</i>) 옵션의 라벨</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) dhtmlxCombo 이미지의 경로</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) 자동 필터링 지원을 활성화합니다(입력 시 옵션이 필터링됨). 선택 사항 이 파라미터는 다음 값 중 하나를 가질 수 있습니다: <ul> <li><b>false</b> - 필터링 비활성화</li> <li><b>true 또는 "start"</b> - 필터링 활성화, 항목의 시작 부분에서 검색</li> <li><b>"between"</b> - 필터링 활성화, 입력한 텍스트가 항목 내 어느 위치에 있든 검색</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) 서버에서 콤보 옵션을 제공하는 서버 스크립트의 경로. 선택 사항</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) 스크립트 응답의 캐시 사용 여부(활성화 권장). 선택 사항</td>
  </tr>
  </tbody>
</table>


## 컨트롤에 데이터 채우기

Combo 컨트롤에 값을 제공하려면 [options](api/config/lightbox.md) 파라미터를 사용하세요:

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

[options](api/config/lightbox.md) 파라미터의 각 항목은 두 가지 필수 속성을 가져야 합니다:

- **key** - 옵션의 id
- **label** - 옵션의 라벨

## 서버에서 데이터로 컨트롤 채우기

Combo 옵션을 서버에서 불러오려면 **script_path** 속성을 사용하여 요청을 처리하는 서버 스크립트의 URL을 지정하세요.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

**script_path** 속성은 콤보가 AJAX를 통해 옵션을 불러올 URL을 정의합니다.

콤보 선택기는 [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html)를 기반으로 하므로, 서버는 호환되는 형식으로 데이터를 반환해야 합니다.
콤보에 데이터를 추가하는 방법에 대한 자세한 내용은 [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html) 문서를 참고하세요. 

두 가지 시나리오에서 요청이 발생합니다:

1) 라이트박스가 열리고 콤보에 선택된 값이 있을 때, 컨트롤은 해당 옵션의 라벨을 불러오기 위해 요청을 보냅니다.

요청에는 **id** 쿼리 파라미터가 포함됩니다:

~~~
GET /url?id="1"
~~~

응답은 지정된 id를 가진 항목만 포함하는 배열이어야 하며, 다음과 같이 포맷됩니다:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) 사용자가 콤보 입력란에 타이핑을 시작하면, 컨트롤은 필터링된 옵션을 불러옵니다.

요청에는 입력한 텍스트가 **mask** 쿼리 파라미터로 포함됩니다:

~~~
GET /url?mask="al"
~~~

서버는 mask와 일치하는 모든 항목을 반환해야 합니다:

~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

[PHP Connector](https://github.com/DHTMLX/connector-php) 라이브러리를 사용하는 경우, 서버 측 코드는 다음과 같을 수 있습니다:

~~~js
<?php
    require_once('../../connector-php/codebase/combo_connector.php');
    require_once("../common/config.php");

    $combo = new ComboConnector($res, $dbtype);

    $combo->event->attach("beforeFilter", "by_id");
    function by_id($filter) {
        if (isset($_GET['id']))
            $filter->add("item_id", $_GET['id'], '=');
    }    

    $combo->dynamic_loading(3);
    $combo->render_table("Countries","item_id","item_nm");

?>
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## 자동 필터링 모드

자동 필터링 모드는 사용자가 입력할 때 옵션이 자동으로 필터링되는 기능입니다. 이 모드를 활성화하려면 **filtering** 속성을 *true*로 설정하세요:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
자동 필터링은 데이터가 클라이언트 또는 서버에서 불러와지는 방식과 관계없이 사용할 수 있습니다.
:::


더 자세한 내용은 dhtmlxCombo의 <a href="https://docs.dhtmlx.com/combo__filtering.html">Filtering</a> 문서를 참고하세요.
