---
sidebar_label: "createUnitsView"
title: "createUnitsView method"
description: "스케줄러 내에서 Units 뷰를 설정합니다."
---

# createUnitsView
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 스케줄러 내에서 Units 뷰를 설정합니다.

@signature: createUnitsView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Units 뷰의 설정 객체

### Example

~~~jsx
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id",
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}    
    ]
});

scheduler.init('scheduler_here',new Date(2027,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2027 09:00",end_date:"06/30/2027 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2027 12:00",end_date:"06/30/2027 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2027 08:00",end_date:"06/30/2027 12:00",text:"Task3",unit_id:2}
],"json");
~~~

**Applicable views:** [Units view](views/units.md)

### Related samples
- [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)

### Details

:::note
 이 메서드를 사용하려면 [units](guides/extensions-list.md#units) 플러그인이 활성화되어 있어야 합니다. 
:::

Units 뷰의 설정 객체는 다음 속성들을 지원합니다:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 뷰의 식별자입니다. 동일한 이름의 Units 뷰가 이미 존재하면 해당 뷰가 대체됩니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>property</b></td>
  <td>(<i>string</i>) 이벤트를 특정 유닛에 연결하는 데 사용되는 데이터 속성을 지정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>list</b></td>
  <td>(<i>객체 배열</i>) 뷰에 표시할 유닛들을 정의합니다.<br> 배열 내 각 객체는 단일 유닛을 나타내며 다음을 포함합니다:<ul><li><b>key</b> - (<i>string</i>) 유닛의 고유 ID입니다. 이 값은 이벤트 데이터 속성과 매칭되어 이벤트를 유닛에 연결합니다.</li><li><b>label</b> - (<i>string</i>) 유닛의 표시 레이블입니다.</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>days</b></td>
  <td>(<i>number</i>) Y-축에 표시할 항목(일) 수입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skip_incorrect</b></td>
  <td>(<i>boolean</i>) <i>true</i>로 설정하면, 어떤 유닛과도 일치하지 않는 이벤트는 표시되지 않습니다. <i>false</i>인 경우, 해당 이벤트들은 첫 번째 유닛에 할당됩니다. 기본값은 <i>false</i>입니다. 선택 사항입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>size</b></td>
  <td>(<i>number</i>) 한 번에 표시할 유닛 수입니다. 실제 유닛 수가 이 값을 초과하면 스크롤바가 나타납니다. 선택 사항입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) 한 번에 스크롤할 유닛 수입니다. 선택 사항입니다.</td>
  </tr>
  </tbody>
</table>
