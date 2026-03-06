---
title: "自定义视图"
sidebar_label: "自定义视图"
---

# 自定义视图

当标准视图无法完全满足您的需求时，可以选择创建自定义视图。

## 视图标签页
开始创建自定义视图时，首先需要为调度器添加一个新的标签页，用于表示您的新视图。通常如下所示:

~~~js
<div class="dhx_cal_tab" data-tab="workweek"></div>
~~~

请注意:

- 标签页的名称应遵循以下模式:(viewName)_tab
- 标签页必须包含至少一个名为 "dhx_cal_tab" 的类，并且它应作为第一个类出现。

要为视图设置标签文本，请使用:

~~~js
scheduler.locale.labels.{viewName}_tab = "someName"
~~~

## 视图处理方法
有三个关键方法用于定义视图的行为--它们决定了视图的区间（如周视图是一周，月视图是一个月等）以及当用户点击头部的 'Next' 或 'Prev' 按钮时的激活日期。

1. **scheduler.date.(viewName)_start (active_date)** - 接收调度器的激活日期，并返回视图区间的起始日期（例如，周视图中当前周的第一天，或月视图中当前月的第一天）。
2. **scheduler.date.get_(viewName)_end (start_date)** - 接收起始日期（由上一个方法返回），并返回视图区间的结束日期（如当前周或月的最后一天）。
3. **scheduler.date.add_(viewName)(date, inc)** - 定义当用户点击头部的 'Next' 或 'Prev' 按钮时，激活日期应如何前进或后退。

## 配置视图模板
最后，您需要为视图头部日期和 X 轴刻度设置模板:

- **视图头部** - scheduler.templates.(viewName)_date = function(start_date, end_date)(...)
- **X 轴** - scheduler.templates.(viewName)_scale_date = function(date)(...)

例如:

~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~

## 分步示例

以下是如何创建一个名为 'workweek' 的自定义视图，其类似于周视图，但只显示工作日。

![custom_view](/img/custom_view.png)

具体步骤如下:
1. 添加视图标签页:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
   <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="workweek_tab"></div>
   </div>
</div>
~~~
2. 为标签页设置文本:
~~~js
scheduler.locale.labels.workweek_tab = "Work week"
~~~
3. 定义返回视图区间起始日期的方法，即当前周的周一:
~~~js
scheduler.date.workweek_start = function(date) {
    return scheduler.date.week_start(date);//
}
~~~
这里我们复用了周视图的 week_start() 方法，因为两个视图的起始日期相同。
4. 定义返回视图区间结束日期的方法，即当前周的周五:
~~~js
scheduler.date.get_workweek_end="function(start_date){" 
    return scheduler.date.add(start_date,5,"day"); 
}
~~~
add() 方法通过加减指定的时间间隔来调整日期。详细说明请参见 [这里](api/other/date.md)。
5. 定义在点击 'Next' 或 'Prev' 按钮时，激活日期变化的方法:
~~~js
scheduler.date.add_workweek="function(date,inc){" 
    return scheduler.date.add(date,inc*7,"day");
}
~~~
add() 方法用于处理时间间隔的加减。更多内容请参见 [这里](api/other/date.md)。
6. 定义视图头部日期的模板:
~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
~~~
此模板与周视图一致，因此我们直接复用默认的周视图模板 - [week_date](api/template/week_date.md)
7. 定义视图 X 轴的模板:
~~~js
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~
此模板同样来自周视图，以保证一致性 - [week_scale_date](api/template/week_scale_date.md)


[Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)


## 设置自定义视图为默认视图
调度器初始化时显示的初始视图可在初始化阶段设置，详见 [init](api/method/init.md)。然而，由于自定义视图的模板在该阶段可能尚未完全处理，可能导致初始化失败。


为避免此问题，请确保在初始化调度器之前，自定义视图所需的模板已准备就绪。可通过在 [onTemplatesReady](api/event/ontemplatesready.md) 事件的处理器中创建自定义视图。该事件会在所有模板处理完成后触发:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    // 在这里放置自定义视图的创建代码
});

scheduler.init(container, date, "custom view name");
~~~
