---
title: "日视图"
sidebar_label: "日视图"
---

# 日视图

日视图用于显示单一天的日历。

![day_view](/img/day_view.png)


## 初始化

在 [基本调度器标记](guides/scheduler-markup.md) 中，日视图默认包含在内。这意味着无需编写额外代码即可在调度器中启用此视图。

~~~js
//标准初始化。日视图会自动包含
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 移除日视图标签页

如果你想从调度器中移除日视图标签页，只需从 [调度器标记](guides/scheduler-markup.md) 中删除相应的 div 即可:

~~~js
//删除此 div 以隐藏 Day 标签页
<div class="dhx_cal_tab" name="day_tab"></div>
~~~

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Day View Templates](views/day-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [이벤트 객체 작업](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [스킨(Skins)](guides/skins.md)
