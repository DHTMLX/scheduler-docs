---
sidebar_label: addMarkedTimespan
title: "addMarkedTimespan 方法"
description: "标记日期，但在某些设置下会实现阻塞（允许为限制设置自定义样式）"
---

## addMarkedTimespan

### Description

@short: 标记日期，并且在某些设置下，可以阻止这些日期（允许对限制的边界应用自定义样式）

@signature: addMarkedTimespan: (config: any) => number

### Parameters

- `config` - (required) *object* - 应用于标记/阻塞的时间跨度的配置对象

### Returns
- `id` - (number) - 已添加时间跨度的 ID

### Example

~~~jsx
//标记日期
scheduler.addMarkedTimespan({  
    days:  5,               // 标记每个星期五
    zones: "fullday",       // 标记全天
    css:   "gray_section"   // 应用的CSS类
});
scheduler.updateView();

//标记并阻止日期
scheduler.addMarkedTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" //这是一个固定值
});
scheduler.updateView();
~~~

### Related samples
- [Highlighting timespans](https://docs.dhtmlx.com/scheduler/samples/09_api/03_highlighted_timespans.html)
- [Highlighting sections in Timeline and Units views](https://docs.dhtmlx.com/scheduler/samples/09_api/04_highlighted_sections_units.html)

### Details

该方法自版本 3.5 起可用。

:::note
 该方法需要启用[limit](guides/extensions-list.md#limit)插件。 
:::

:::note

请注意，标记（阻塞）不会在你调用该方法后立即应用。你应当调用 [`updateView()`](api/method/updateview.md) 以应用标记。

:::

## Configuration object properties

配置对象可以包含以下属性：

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性
  </th>
  <th>
  描述
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> 用于设置限制起始日期的 Date 对象</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//阻止从2027年5月3日开始创建事件，直到'end_date' 
start_date: new Date(2027, 4, 3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 用于设置限制结束日期的 Date 对象</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//阻止从'start_date'直到2027年9月3日创建事件
end_date: new Date(2027, 8, 3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> 应受限的天数</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days: [0, 2, 6] // 限制星期日、星期二和星期六
days: "fullweek" // 限制整周
days: new Date(2027,6,1) // 阻止2027年7月1日
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>应限制的时间段，以分钟表示</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 两个限制区间：04:00-08:00 和 12:00-15:00
zones: [4*60,8*60,12*60,15*60] 
zones: "fullday" // 限制全天
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td>CSS 类名</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css: "gray" // 绘制一个应用了'gray' CSS类的DIV
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td>将被添加到标记范围内的 HTML 内容</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 在标记范围上绘制一个带有此文本的DIV  
html: "<b>Blocked</b>"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td>定义时间跨度的类型。type 为 'dhx_time_block' 时表示对时间跨度应用阻塞。使用其他任意类型（你可以指定任意值）时，事件将仅被标记</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" //时间段将被标记并阻止  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>指定是否应对由 zones 属性设置的时间段进行反向处理（默认 false）</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 结果是两个限制区间：00:00-08:00 和 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// 结果是两个限制区间：00:00-08:00 和 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>允许仅对特定视图中的特定项进行日期阻塞。指定的日期仅在相关视图中被阻塞</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// 仅阻止Unit视图中id=5的条目日期，
// 以及Timeline视图中id为2和3的条目日期
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## 配置属性的可接受组合

:::note

请注意，*days* 和 *zones* 必须一起使用，*start_date* 和 *end_date* 也必须成对使用来定义阻止区间。这些配对不能以其他方式混合。
例如，不能将 *zones* 与 *start_date* 组合，也不能同时使用 *days* 和 *start_date* 及 *end_date*。
 
:::

因此，有两种可接受的组合，具有特定的属性集：

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性集合
  </th>
  <th>
  示例
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul></td>
  <td>
~~~js
const config = {
    days: 1,
    zones: [9 * 60, 15 * 60],
    css: "cssClassName",
    sections: {
        unit: 5
    }
};
~~~
</td>
  </tr>
  <tr>
  <td> 
  <ul>
  <li>`start_date`</li>
  <li>`end_date` </li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
const config = {
    start_date: new Date(2027, 7, 13),
    end_date: new Date(2027, 7, 14),
    css: "cssClassName",
    sections: {
        unit: 5
    }
};
~~~
</td>
</tr>
  </tbody>
</table>


## `markTimespan()` 和 `addMarkedTimespan()` 对比

<table >
<tr><td>
addMarkedTimespan 
</td><td>
markTimespan 
</td></tr>
<tr><td>
需要调用 [`updateView()`](api/method/updateview.md) 方法来为时间跨度绘制一个 DIV
</td><td>
自动为时间跨度绘制一个 DIV
</td></tr>
<tr><td>
时间跨度在整个过程中一直存在
</td><td>
时间跨度将在应用的任何内部更新后隐藏
</td></tr>
<tr><td>
返回配置的时间跨度的 ID
</td><td>
返回一个 DIV 或一个 DIV 数组
</td></tr>
</table>

### Related API
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [markTimespan](api/method/marktimespan.md)
- [checkInMarkedTimespan](api/method/checkinmarkedtimespan.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)