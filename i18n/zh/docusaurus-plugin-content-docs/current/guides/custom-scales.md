---
title: "在视图的 X 轴上隐藏时间单位"
sidebar_label: "在视图的 X 轴上隐藏时间单位"
---

# 在视图的 X 轴上隐藏时间单位

该库允许你在视图的水平时间轴上隐藏不需要的时间单位。例如，仅显示工作日而隐藏周末时，这一功能会非常有用。

## 实现方法 {#technique}

要在视图的时间轴上隐藏某个时间单位（如在 Timeline 视图中隐藏小时，或在 Week 视图中隐藏天），可以使用 **ignore_(viewName)** 方法。 
此方法是一个函数，接收该单位的日期作为参数。如果对某个单位返回 *true*，则该单位会被隐藏。

例如，要在 Month 视图中隐藏周末，可以这样写:

~~~js
// 0 代表星期日，6 代表星期六
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) //隐藏星期六和星期日
        return true;
};
~~~

![hiding_time_units](/img/hiding_time_units.png)


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## 在被隐藏的刻度单元处显示标记

为了指示哪些刻度单元被隐藏，可以使用 [addMarkedTimespan](api/method/addmarkedtimespan.md) 方法。例如，在 Timeline 视图中，仅显示 10:00 到 18:00 之间的小时，其余时间被隐藏。 
可以使用持续 40 分钟的标记来突出显示被隐藏的小时:分别在相邻单元格的两侧各标记 20 分钟。

~~~html
.yellow_section {
    background-color: #ffa749;
    opacity: 0.25;
}
~~~

~~~js
scheduler.addMarkedTimespan({
    days: "fullweek",
    zones:[9.5*60, 20.5*60],
    invert_zones:true,
    css: "yellow_section"
});
~~~


![highlighting_hidden_hours](/img/highlighting_hidden_hours.png)


[Displaying a marker at the place of hidden scale units](https://docs.dhtmlx.com/scheduler/samples/11_scales/07_timeline_hours_marker.html)
