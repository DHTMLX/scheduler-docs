---
title: "过滤事件"
sidebar_label: "过滤事件"
---

# 过滤事件

对于每个视图，可以定义一个过滤函数，用于决定哪些事件会显示在调度器中，哪些事件会被隐藏。

~~~js
scheduler.filter_week = function(id, event){
    if(event.name == 'New event')
        return false; // 该事件将被过滤（不会渲染）
        //或者
        return true; // 该事件将被渲染
}
~~~

这里，"week"指的是视图的名称（在 *'scheduler.filter_week'* 中使用）。

**filter_(viewName)** 函数接受两个参数:

- **id** - 事件的标识符
- **event** - 事件对象本身

也可以为不同的视图分配不同的过滤函数:

~~~js
scheduler.filter_day = scheduler.filter_week = function(id, event){
    //some_code
}
...
scheduler.filter_timeline = function(id, event){
    //some_other code
}

~~~


[Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)
