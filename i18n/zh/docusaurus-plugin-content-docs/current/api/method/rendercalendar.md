---
sidebar_label: "renderCalendar"
title: "renderCalendar method"
description: "生成一个紧凑型日历"
---

# renderCalendar

### Description

@short: 生成一个紧凑型日历

@signature: renderCalendar: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - 日历的配置设置对象

### Returns
- ` div` - (HTMLElement) - 日历的HTML元素

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date, calendar){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)

### Details

:::note
 此方法需要启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
::: 

配置对象可包含以下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>container</b></td>
  <td>(<i>string, object</i>) 日历将被放置的HTML容器（或其ID）。此项为可选。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>position</b></td>
  <td>(<i>object</i>) 指定日历的位置。可以是坐标对象或HTML元素的ID。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>string</i>) 设置日历初始显示的日期</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>navigation</b></td>
  <td>(<i>boolean</i>) 切换是否显示月份导航按钮</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>handler</b></td>
  <td>(<i>function</i>) 日期被点击时触发的回调函数。该函数接收被点击的日期和calendar实例作为参数</td>
  </tr>
  </tbody>
</table>

~~~js
const calendar = scheduler.renderCalendar({
    container:"for_calendar",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position:"some_id",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position: { left: 100, top: 50 },
    date:new Date()
});

~~~

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
