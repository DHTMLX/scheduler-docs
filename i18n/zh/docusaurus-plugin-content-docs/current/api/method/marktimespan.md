---
sidebar_label: "markTimespan"
title: "markTimespan method"
description: "通过应用默认或自定义样式来高亮或阻止特定日期。高亮会在应用内部任何更新后立即移除。此功能适用于强调某些日期。"
---

# markTimespan

### Description

@short: 通过应用默认或自定义样式来高亮或阻止特定日期。高亮会在应用内部任何更新后立即移除。此功能适用于强调某些日期。

@signature: markTimespan: (config: any) =\> any[]

### Parameters

- `config` - (required) *object* - 要标记或阻止的时间段的配置详情

### Returns
- ` divs` - (array) - 返回一个 HTML 元素数组

### Example

~~~jsx
//高亮特定日期
scheduler.markTimespan({  
    days:  5,               // 高亮每周五  
    zones: "fullday",       // 高亮全天
    css:   "gray_section"   // 应用的 CSS 类
});

//高亮并阻止特定日期
scheduler.markTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" // 固定值，用于阻止该时间段
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

 该方法自版本 3.5 起可用。
 
:::

:::note
 该方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

## 配置对象属性

配置对象支持以下属性:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性 
  </th>
  <th>
  说明
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> 一个 Date 对象，指定限制开始时间</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 阻止从 2012年5月3日 开始直到 'end_date' 的事件创建
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 一个 Date 对象，指定限制结束时间</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 阻止从 'start_date' 开始直到 2012年9月3日 的事件创建
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> 要限制的日期</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] // 限制星期日、星期二和星期六
days:"fullweek" // 限制整周
days:new Date(2012,6,1) // 阻止 2012年7月1日
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> 要限制的时间段，单位为分钟</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] // 两个限制区间：04:00-08:00，12:00-15:00
zones:"fullday" // 限制全天
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> 要应用的 CSS 类名 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" // 创建一个带有 'gray' CSS 类的 DIV
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td> 在标记范围内显示的 HTML 内容 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
html:"<b>Blocked</b>" // 在标记范围的 DIV 内添加此文本  
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td> 指定时间段的类型。设置为 'dhx_time_block' 时会阻止该时间段。其他值仅标记时间段，不阻止 </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // 标记并阻止该时间段  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> 是否反转由 'zones' 设置的时间段（默认 false） </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 结果为两个限制区间：00:00-08:00，17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// 结果为两个限制区间：00:00-08:00，17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> 限制阻止仅针对特定视图中的特定项。阻止仅在相关视图内生效</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 仅阻止 Units 视图中 id=5 的项的日期 
// 以及 Timeline 视图中 id 为 2 和 3 的项 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## 配置属性的可接受组合

:::note

请注意，*days*、*zones* 与 *start_date*、*end_date* 是成对定义阻止区间的，不应混用。
例如，不能将 *zones* 与 *start_date* 一起使用，也不能同时将 *days* 与 *start_date* 和 *end_date* 组合。
 
:::

有效的属性组合有两种:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性组合 
  </th>
  <th>
  示例
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>
  <ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    days:  1, 
    zones: [9*60, 15*60], 
    css: "cssClassName", 
    sections: {
         unit: 5
    }
}

~~~
</td>
  </tr>
  <tr>
  <td> 
  <ul>
  <li>`start_date`</li>
  <li>`end_date`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    start_date: new Date(2012,7,13),
    end_date:   new Date(2012,7,14),
    css: "cssClassName",
    sections: {
         unit: 5
    }
}
~~~
</td>
  </tr>
  </tbody>
</table>

## markTimespan() 与 addMarkedTimespan() 的对比

<table >
<tr><td markdown='1'>
addMarkedTimespan 
</td><td markdown='1'>
markTimespan 
</td></tr>
<tr><td markdown='1'>
需要调用 [updateView](api/method/updateview.md) 方法来渲染时间段的 DIV 
</td><td markdown='1'>
自动渲染时间段的 DIV 
</td></tr>
<tr><td markdown='1'>
时间段会永久显示 
</td><td markdown='1'>
应用内部任何更新后，时间段会立即隐藏 
</td></tr>
<tr><td markdown='1'>
返回创建的时间段 ID 
</td><td markdown='1'>
返回一个 DIV 或 DIV 数组 
</td></tr>
</table>

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
