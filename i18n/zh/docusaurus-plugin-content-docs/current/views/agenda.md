---
title: "议程视图"
sidebar_label: "议程视图"
---

# 议程视图

*如果您正在使用 dhtmlxScheduler 6.0 或更早版本，请查阅[此处](views/agenda-legacy.md)的详细信息。*

议程视图以清晰、有序的方式展示即将到来的事件列表。

![agenda_view](/img/agenda_view.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
默认情况下，左侧的列表会从当前月份的第一天开始显示事件。要调整此行为，您可以使用 [agenda_start](api/config/agenda_start.md) 和 [agenda_end](api/config/agenda_end.md) 属性，或者重写 **scheduler.date.agenda_start** 和 **scheduler.date.agenda_end** 函数。
:::

## 初始化

要将议程视图添加到您的调度器中，请按照以下步骤操作:

1) 在页面上启用 Agenda 扩展:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) 在调度器的 HTML 中添加视图的标签页:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="agenda"></div>
    </div>
    ...    
</div>
~~~
  
3) 设置标签页的显示文本:

~~~js
//'agenda_tab' 指的是标签页的 div。默认标签为 'Agenda' 
scheduler.locale.labels.agenda_tab = "我的议程"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## 界面细节

- 双击列表中的空白单元格可创建新事件。
- 双击事件行可打开编辑或删除事件的灯箱。

## 本地化提示

议程视图在语言包中包含两个标签:

- **scheduler.locale.labels.agenda_tab** - 视图标签页的名称
- **scheduler.locale.labels.full_day** - 用于全天或多天事件的标签

通常，第一个标签在添加视图标签页时设置，而第二个标签仅在您的应用程序使用非英语语言时需要自定义。

## 上一月/下一月/今天按钮

默认情况下，议程视图显示一个月内的事件。上一月、下一月和今天按钮允许用户在不同月份间切换。您可以通过重写 **scheduler.date.agenda_start()** 和 **scheduler.date.add_agenda()** 函数来调整显示的时间范围。

**scheduler.date.agenda_start(date)** 根据给定日期返回视图显示区间的起始日期。默认返回该月的第一天。

您可以重写这些函数，例如，仅显示一周的事件:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.week_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "week"); 
}; 
~~~

这样会将显示范围限制为一周。

## 设置可显示日期范围

您还可以通过设置 [agenda_end](api/config/agenda_end.md) 和 [agenda_start](api/config/agenda_start.md) 属性来固定显示的日期范围:

~~~js
scheduler.config.agenda_start = new Date(2023, 5, 1); 
scheduler.config.agenda_end = new Date(2023, 6, 1);   
~~~

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Agenda View Templates](views/agenda-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [스킨(Skins)](guides/skins.md)
- [Localization](guides/localization.md)
