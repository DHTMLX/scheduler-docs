---
title: "自定义事件内容"
sidebar_label: "自定义事件内容"
---

# 自定义事件内容

要定制事件的内容并决定显示哪些数据，模板是最佳方式。不同的视图依赖于不同的模板，想要了解某个特定视图使用了哪些模板，请参阅文章 [레이블, 날짜, 스타일 포매팅](guides/templates.md)。

本文重点介绍如何修改最常用视图 [Day View](views/day.md) 和 [주간 보기](views/week.md) 的模板。

这些视图通过两个模板来自定义事件文本:

- [event_header](api/template/event_header.md) - 定义事件的标题
- [event_text](api/template/event_text.md) - 定义事件的文本内容

此外，还有 [event_bar_text](api/template/event_bar_text.md) 模板，用于设置多日事件的文本。该模板被 [Month View](views/month.md) 和 [타임라인 뷰](views/timeline.md) 使用。

:::note
建议在 [onTemplatesReady](api/event/ontemplatesready.md) 事件的处理函数中重定义模板，这样可以防止你的模板被默认模板覆盖。
:::

## 自定义事件标题

事件的标题由 [event_header](api/template/event_header.md) 模板控制。

~~~js
//默认定义
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*假设你的数据对象中包含一个布尔属性 **important**，用于标记事件是否重要。你希望让重要的事件更加醒目，比如添加一个红色勾选图标，并将事件时长以橙色显示。*


![custom_event_header](/img/custom_event_header.png)

实现方法如下:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev){
        if (event.important == true){
            return ("![red_check](/img/red_check.png) <b>"+
                scheduler.templates.event_date(start)+" - "+
        } else {
            return(scheduler.templates.event_date(start)+" - "+
            scheduler.templates.event_date(end))
        }
    };
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~

## 自定义事件文本内容

事件文本由 [event_text](api/template/event_text.md) 模板设置。

~~~js
//默认定义
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*假设你的数据对象中有一个额外的属性 **location**，用于指示事件举办的地点。你希望在事件框中显示事件文本及其地点。*


![custom_event_text](/img/custom_event_text.png)

实现方法如下:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_text="function(start,end,event){"
        return "<b>" + event.text + "</b>

<i>" + event.location + "</i>";
    }
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~
