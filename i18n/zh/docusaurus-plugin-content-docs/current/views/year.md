---
title: "年视图"
sidebar_label: "年视图"
---

# 年视图

年视图在日历中显示一个或多个年份。

![year_view](/img/year_view.png)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## 初始化

要在调度器中启用年视图，请按照以下步骤操作:

1. 在页面上激活 Year 扩展:
~~~js
scheduler.plugins({
    year_view: true
});
~~~
2. 在调度器的标记中添加视图的标签(tab):
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="year_tab"></div>
    </div>
    ...    
</div>
~~~
3. 为标签设置显示文本:
~~~js
//'year_tab' 是我们 div 的名称
scheduler.locale.labels.year_tab = "Year"; 
~~~


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## 界面细节

- 已分配事件的日期会被高亮显示。
- 将鼠标悬停在某一天，会显示一个工具提示，列出当天安排的所有事件。点击工具提示中的"details"图标将打开 lightbox（除非启用了只读模式）。


## 设置视图中的月份数量

要控制每行和每列中显示多少个月份，请调整 [year_x](api/config/year_x.md) 和 [year_y](api/config/year_y.md) 属性:

~~~js
//年视图将只显示 6 个月
scheduler.config.year_x = 2; //每行显示 2 个月
scheduler.config.year_y = 3; //每列显示 3 个月

~~~


## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Year View Templates](views/year-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [이벤트 객체 작업](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [스킨(Skins)](guides/skins.md)
