---
sidebar_label: "blockTime"
title: "blockTime method"
description: "阻止给定的日期，并应用默认的'dimmed'样式。"
---

# blockTime
:::warning 
此功能已棄用。
:::
### Description

@short: 阻止给定的日期，并应用默认的"dimmed"样式。

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - 要阻止的日期（如果提供的是数字，则视为一周中的某天:<br> '0' 表示星期天，'6' 表示星期六）
- `time_points` - (required) *array* - 一个数组 <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>，<br> 每对定义一个时间范围。数组可以包含任意数量的此类时间段对
- `items` - (optional) *object* - 指定要阻止的视图中特定的项

### Example

~~~jsx
//阻止每周三从午夜到早上8点的事件
//但仅限于 Units 视图中 id=1 和 id=4 的项
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 此方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

此方法可以多种方式使用，例如:


~~~js
//阻止2027年5月3日整天
scheduler.blockTime(new Date(2027,5,3), "fullday");

//阻止2027年6月3日从午夜到上午10点的事件
scheduler.blockTime(new Date(2027,6,3), [0,10*60]);

//阻止每个星期六从午夜到早上8点，以及晚上6点到午夜的事件
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//阻止每个星期天的所有事件
scheduler.blockTime(0, "fullday");

//阻止每周三从午夜到早上8点的事件
//但仅限于 Units 视图中 id=1 和 id=4 的项
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//与上面相同，但使用配置对象传递参数
scheduler.blockTime({
    days: 3,
    zones: [0,8*60],
    sections: {
        unit: [1,4]
    }
});

~~~

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
  <td> 定义限制开始时间的 Date 对象</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//阻止从2027年5月3日开始创建事件，直到'end_date'
start_date:new Date(2027,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> 定义限制结束时间的 Date 对象</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//阻止从'start_date'直到2027年9月3日创建事件
end_date:new Date(2027,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> 要阻止的天数</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //阻止星期天、星期二和星期六
days:"fullweek" //阻止整周
days:new Date(2027,6,1) //阻止2027年7月1日
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> 要阻止的时间段（以分钟为单位）</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] //两个阻止区间：04:00-08:00，12:00-15:00
zones:"fullday" //阻止整天
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> 应用的 CSS 类名</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" //添加一个带有 'gray' CSS 类的 DIV
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> 是否反转由 'zones' 定义的时间段（默认值为 false）</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//结果是两个阻止区间：00:00-08:00 和 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//结果是两个阻止区间：00:00-08:00 和 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> 允许只针对特定视图中的特定项阻止日期。<br> 注意，指定的日期仅在这些视图中被阻止</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//仅阻止 Units 视图中 id=5 的项的日期
//以及 Timeline 视图中 id=2 和 id=3 的项
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- 自 v5.1 起废弃
