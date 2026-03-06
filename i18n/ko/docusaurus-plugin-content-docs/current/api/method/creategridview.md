---
sidebar_label: "createGridView"
title: "createGridView method"
description: "스케줄러 내에서 Grid 뷰를 설정합니다."
---

# createGridView
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 스케줄러 내에서 Grid 뷰를 설정합니다.

@signature: createGridView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Grid 뷰 구성을 위한 설정 객체

### Example

~~~jsx
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",       label:'Book Title',    width:'*',    align:'right',     sort:'str'},
        {id:"date",     label:'Author',     width:100},
        {id:"text",     label:'Votes',         width:200,    align:'left',    sort:'int'}
    ],
    from:new  Date(2000, 00, 01),
    to:new Date(2013, 00, 01)
});
~~~

**Applicable views:** [Grid view](views/grid.md)

### Related samples
- [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

### Details

:::note
 이 메서드를 사용하려면 [grid_view](guides/extensions-list.md#grid-view) 플러그인이 활성화되어 있어야 합니다. 
:::

Grid 뷰 구성 객체는 다음 속성을 지원합니다:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 뷰의 식별자</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>fields</b></td>
  <td>(<i>객체 배열</i>) grid의 컬럼을 정의합니다.<br> 배열 내 각 객체는 하나의 컬럼을 나타내며 다음 속성을 포함할 수 있습니다:<ul><li><b>id</b> - (<i>string</i>) 컬럼의 id로, 해당 데이터 속성 이름과 일치해야 합니다.</li><li><b>label</b> - (<i>string</i>) 컬럼 헤더 텍스트</li><li><b>width</b> - (<i>string</i>) 컬럼의 너비. '*'를 사용하면 남은 공간을 채우도록 확장됩니다. 여러 컬럼이 '*'를 사용하면 남은 너비를 균등하게 나눕니다.</li><li><b>align</b> - (<i>right, center 또는 left</i>) 텍스트의 수평 정렬</li><li><b>valign</b> - (<i>top, middle 또는 bottom</i>) 텍스트의 수직 정렬</li><li><b>template</b> - (<i>function</i>) 셀 데이터에 대한 커스텀 템플릿 함수</li><li><b>sort</b> - (<i>'int','date','str' 또는 커스텀 함수</i>) 컬럼 정렬 활성화(헤더 클릭 시)로, 미리 정의된 타입 또는 사용자 정의 정렬 함수를 사용할 수 있습니다.</li><li><b>css</b> - (<i>string</i>) 컬럼에 적용할 CSS 클래스 이름</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select</b></td>
  <td>(<i>boolean</i>) grid 내 선택 기능 활성화 여부 (기본값: 활성화)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>rowHeight</b></td>
  <td>(<i>number</i>) 각 행의 높이를 지정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>paging</b></td>
  <td>(<i>boolean</i>) grid 내 네비게이션 버튼 ![navigation_buttons](/img/navigation_buttons.png) 표시 여부를 토글합니다. [(자세한 정보)](views/grid.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unit</b></td>
  <td>(<i>minute, hour, day, week, month, year</i>) 스크롤 단위를 정의합니다. 기본값은 'month'입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) 한 번에 스크롤할 단위 수를 지정합니다. 기본값은 1입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>from</b></td>
  <td>(<i>Date</i>) 스케줄러 날짜 범위의 시작 날짜 제한을 설정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>to</b></td>
  <td>(<i>Date</i>) 스케줄러 날짜 범위의 종료 날짜 제한을 설정합니다.</td>
  </tr>
  </tbody>
</table>

### Related Guides
- ["Grid View"](views/grid.md)

