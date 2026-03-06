---
sidebar_label: "onMouseDown"
title: "onMouseDown event"
description: "当用户点击调度器中没有预定义 'onclick' 处理程序的元素时触发"
---

# onMouseDown

### Description

@short: 当用户点击调度器中没有预定义 'onclick' 处理程序的元素时触发

@signature: onMouseDown: (className: string) =\> void

### Parameters

- `className` - (required) *string* - 被点击元素的 CSS 类名

### Example

~~~jsx
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});
~~~

### Details

调度器中带有预定义 'onclick' 处理程序的元素详见下表。

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>表 1 </strong>
  带有预定义 'onclick' 处理程序的调度器元素
  </caption>
  <thead>
  <tr>
  <th>
  类名
  </th>
  <th>
  元素
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>dhx_cal_event_line</td>
  <td>在 Day、Week、Month、Units 视图中显示的多天事件，以及 Timeline 视图中的任何事件</td>
  </tr>
  <tr>
  <td>dhx_cal_event_clear</td>
  <td>Month 视图中的单天事件</td>
  </tr>
  <tr>
  <td>dhx_event_move</td>
  <td>Day、Week、Units 视图中用于拖动事件的事件框头部</td>
  </tr>
  <tr>
  <td>dhx_wa_ev_body</td>
  <td>WeekAgenda 视图中显示的事件</td>
  </tr>
  <tr>
  <td>dhx_event_resize</td>
  <td>Day、Week、Units 视图中用于调整事件大小的事件框底部</td>
  </tr>
  <tr>
  <td>dhx_scale_holder</td>
  <td>Day、Week、Units 视图中的一列</td>
  </tr>
  <tr>
  <td>dhx_scale_holder_now</td>
  <td>Day、Week、Units 视图中表示当前日期的高亮列</td>
  </tr>
  <tr>
  <td>dhx_month_body</td>
  <td>Month 视图中无标题的单元格</td>
  </tr>
  <tr>
  <td>dhx_matrix_cell</td>
  <td>Timeline 视图中的单元格</td>
  </tr>
  <tr>
  <td>dhx_marked_timespan</td>
  <td>被标记（高亮）的单元格</td>
  </tr>
  <tr>
  <td>dhx_time_block</td>
  <td>被阻止的单元格</td>
  </tr>
  </tbody>
</table>
