---
title: "周视图"
sidebar_label: "周视图"
---

# 周视图

周视图可以同时显示一周或多周的内容。

![week_view](/img/week_view.png)


## 初始化

周视图默认包含在[basic scheduler's markup](guides/scheduler-markup.md)中。因此，无需添加额外代码即可在调度器中使用该视图。

~~~js
//标准初始化。周视图会自动添加
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 移除周视图标签

如果你想从调度器中移除周视图标签，只需从[scheduler's markup](guides/scheduler-markup.md)中删除相应的div元素:

~~~js
//移除此div即可删除Week标签
<div class="dhx_cal_tab" name="week_tab"></div>
~~~


## 隐藏视图X轴中的指定日期

如果你想从时间刻度中排除某些日期，例如只保留工作日并跳过周末，可以使用**ignore_week()**方法。


该方法是一个函数，接收日期参数，对于需要隐藏的日期应返回*true*。

~~~js
// 0代表星期日，6代表星期六
scheduler.ignore_week = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) //隐藏星期六和星期日
        return true;
};
~~~


[Hiding days in the scale of Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/02_week_ignore.html)


## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [주간 뷰 템플릿](views/week-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [이벤트 객체 작업](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [스킨(Skins)](guides/skins.md)
