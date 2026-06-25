---
title: "议程视图（v6.0）"
sidebar_label: "议程视图（v6.0）"
---

# 议程视图（v6.0）

*本文适用于 dhtmlxScheduler 6.0 及更早版本。如需了解 dhtmlxScheduler 7.0 及以上版本的详情，请参阅 [这里](views/agenda.md)。*

议程视图用于显示即将到来的事件列表。

![agenda_view_old](/img/agenda_view_old.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
默认情况下，视图左侧的列表会显示从当前日期开始的事件。如需调整此行为，请使用 [agenda_start](api/config/agenda_start.md) 和 [agenda_end](api/config/agenda_end.md) 属性。
:::

## 初始化

要在调度器中添加议程视图，请按照以下步骤操作:

1）在页面上启用 Agenda 扩展:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2）在调度器的标记中添加视图的标签:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="agenda_tab"></div>
    </div>
    ...    
</div>
~~~
  
3）为标签设置显示文本:

~~~js
//'agenda_tab' 是 div 的名称。默认标签为 'Agenda'
scheduler.locale.labels.agenda_tab = "My Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## 界面细节

- 双击列表中的空白单元格以创建新事件。
- 要编辑或删除事件，双击事件描述左侧的"详情"图标，打开 lightbox 进行修改。

## 本地化提示

议程视图在本地化中包含 3 个标签:

- **scheduler.locale.labels.(agendaName)_tab** - 视图标签的文本
- **scheduler.locale.labels.date** - 日期列的表头
- **scheduler.locale.labels.description** - 描述列的表头

通常，第一个标签会在添加视图标签时设置。只有在应用程序需要本地化为非英文语言时，才需要更改其他标签。

## 设置可显示日期的范围

要定义议程视图中显示的日期范围，请使用 [agenda_end](api/config/agenda_end.md) 和 [agenda_start](api/config/agenda_start.md) 属性:

~~~js
//显示从 2026 年 6 月 1 日开始的日期
scheduler.config.agenda_start = new Date(2026, 5, 1); 

//显示截止到 2027 年 6 月 1 日的日期
scheduler.config.agenda_end = new Date(2027, 5, 1);   
~~~

## 启用上一页/下一页/今天按钮

可以通过重定义 **scheduler.date.agenda_start()** 和 **scheduler.date.add_agenda()** 函数，在议程视图中启用上一页、下一页和今天按钮。

**scheduler.date.agenda_start(date)** 返回给定日期显示区间的起始时间。默认情况下，它返回一个固定的日期，因此议程视图不会响应导航按钮的点击。

可以将这些函数重定义为例如返回当前月份的起始时间:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.month_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "month"); 
}; 
~~~

这样，导航按钮即可正常工作。

**Related sample** [Next/Previous/Today buttons in Agenda view](https://snippet.dhtmlx.com/5/5a5d072f2)


## 列宽设置

可以通过 CSS 类自定义议程视图中各列的宽度:

~~~css
<style>
  .dhx_agenda_line div{
     width: 300px; 
  }
  .dhx_v_border{
     left: 299px; 
  }
</style>
~~~

![Columns Width](/img/agenda_columns_width.png)

**Related sample** [Adjusting width of columns](https://snippet.dhtmlx.com/5/8a2c1eb40)

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Agenda View Templates](views/agenda-view-templates-legacy.md)
- [데이터 불러오기](guides/loading-data.md)
- [스킨(Skins)](guides/skins.md)
- [Localization](guides/localization.md)
