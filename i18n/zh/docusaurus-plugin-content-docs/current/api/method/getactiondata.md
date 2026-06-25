---
sidebar_label: "getActionData"
title: "getActionData method"
description: "返回当前光标下的日期和区段（如果有的话）"
---

# getActionData

### Description

@short: 返回当前光标下的日期和区段（如果有的话）

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` point` - (object) - 一个包含两个属性的对象:<ul><li><b>date</b> - (<i>Date</i>) 光标位置的日期 </li> <li><b>section</b> - (<i>string, number</i>) 光标下区段的标识符（<i>适用于Timeline和Units视图</i>）</li></ul>

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function(id, e){
   const action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2027 09:10:00, section:2}
   ...
})
~~~

### Related samples
- [Tracking the cursor position](https://docs.dhtmlx.com/scheduler/samples/09_api/01_action_data.html)
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

:::note

从版本3.5开始可用
 
:::
