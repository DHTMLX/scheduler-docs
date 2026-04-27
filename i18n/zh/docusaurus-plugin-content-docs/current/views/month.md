---
title: "月视图"
sidebar_label: "月视图"
---

# 月视图

月视图显示单个月份的日历。

![month_view](/img/month_view.png)

## 初始化 {#initialization}

月视图在[基础调度器标记](guides/scheduler-markup.md)中默认包含，因此无需额外操作即可添加。

~~~js
// 标准初始化；月视图会自动包含
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 移除月视图标签 {#removingthemonthviewtab}

如果需要移除月视图标签，只需从[scheduler 的标记](guides/scheduler-markup.md)中删除对应的 div:

~~~js
// 删除此 div 即可移除月视图标签
<div class="dhx_cal_tab" name="month_tab"></div>
~~~

## 限制单元格中的事件数量 {#limitingthenumberofeventsinacell}

默认情况下，scheduler 会自动调整单元格高度以容纳所有事件。

从 4.0 版本开始，可以控制每个单元格中显示的事件数量，同时也限制了单元格高度。

要设置每个单元格的最大事件数，请使用 [max_month_events](api/config/max_month_events.md) 选项:

~~~
scheduler.config.max_month_events = 3;
..
scheduler.init('scheduler_here', new Date(2027,5,30), "month");
~~~

如果事件数量超过设定的上限，将会出现"View more"链接。点击该链接会跳转到日视图，完整显示全部事件。


['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)


## 隐藏视图 X 轴上的某些天 {#hidingdaysinthexaxisoftheview}

如果需要从时间轴上排除某些天（如只显示工作日，隐藏周末），可以使用 **ignore_month()** 方法。


此函数以单元格日期为参数。对于需要隐藏的日期，返回 *true* 即可。

~~~js
// 0 表示周日，6 表示周六
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // 隐藏周六和周日
        return true;
};
~~~


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## 将日期数字显示为可点击链接 {#presentingdaysnumbersasclickablelinks}

月视图中的日期数字可以设置为可点击，点击后打开对应日期的指定视图。

要实现日期数字可点击:

1. 在页面上启用 active_links 扩展:
~~~js
scheduler.plugins({
    active_links: true
});
~~~
2. （可选）设置 [active_link_view](api/config/active_link_view.md) 选项，指定点击日期时打开的视图类型。默认会打开 [Day View](views/day.md):
~~~js
// 点击日期时打开周视图
scheduler.config.active_link_view = "week";
...
scheduler.init('scheduler_here', new Date(2027,7,6), "month");
~~~


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## 通过拖拽调整事件大小（ver. 4.1+） {#resizingeventsbydragndropver41}

默认情况下，月视图中无法通过拖拽调整事件大小（只能通过编辑表单）。

如需通过拖拽调整多日事件的大小，请启用 [resize_month_events](api/config/resize_month_events.md) 选项:

~~~js
// 允许通过拖拽调整多日事件大小
scheduler.config.resize_month_events = true; /*!*/

scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

[Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)


如需允许通过拖拽同时调整单日和多日事件的大小，还需将 [resize_month_timed](api/config/resize_month_timed.md) 选项设为 *true*:

~~~js
// 允许通过拖拽调整单日和多日事件大小
scheduler.config.resize_month_events = true;/*!*/
scheduler.config.resize_month_timed = true;  /*!*/
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

**请注意:**

- [resize_month_timed](api/config/resize_month_timed.md) 选项仅在启用 [resize_month_events](api/config/resize_month_events.md) 时有效。
- 启用 [resize_month_timed](api/config/resize_month_timed.md) 后，单日事件的显示方式会有所不同:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)
  

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Month View Templates](views/month-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [이벤트 객체 작업](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [스킨(Skins)](guides/skins.md)
