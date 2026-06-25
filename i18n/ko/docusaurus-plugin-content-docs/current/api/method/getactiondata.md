---
sidebar_label: "getActionData"
title: "getActionData method"
description: "현재 커서 아래에 있는 날짜와 섹션을 반환합니다. 해당 항목이 없을 경우에는 반환하지 않습니다."
---

# getActionData

### Description

@short: 현재 커서 아래에 있는 날짜와 섹션을 반환합니다. 해당 항목이 없을 경우에는 반환하지 않습니다.

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` point` - (object) - 두 가지 속성을 포함하는 객체: <ul><li><b>date</b> - (<i>Date</i>) 커서 위치의 날짜 </li> <li><b>section</b> - (<i>string, number</i>) 커서 아래 섹션의 식별자 (<i>Timeline 및 Units 뷰에 적용 가능</i>)</li></ul>

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function(id, e){
   var action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2027 09:10:00, section:2}
   ...
})
~~~

### Related samples
- [Tracking the cursor position](https://docs.dhtmlx.com/scheduler/samples/09_api/01_action_data.html)
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

:::note

버전 3.5부터 사용 가능합니다.
 
:::
