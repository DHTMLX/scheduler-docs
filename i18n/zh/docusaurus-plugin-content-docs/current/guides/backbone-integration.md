---
title: "Backbone 集成"
sidebar_label: "Backbone 集成"
---

# Backbone 集成

从 4.0 版本开始，库提供了专门的扩展 [**mvc**](guides/extensions-list.md#mvc)，可以实现调度器与 Backbone 库的平滑集成。

对于基于 Backbone 构建的应用程序，如果希望在继续通过 Backbone 管理数据的同时集成调度器，可以按照以下方式操作:

1. 将 dhtmlxScheduler 文件添加到您的应用程序中:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. 在页面上启用 mvc 扩展:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. 像往常一样设置并初始化调度器:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. 接下来，创建一个 Backbone 数据集合并将调度器连接到该集合:
~~~js
//这里可以使用任何模型
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //将调度器与集合连接
~~~

完成上述操作后，调度器会从集合中加载数据，并与任何更新保持同步。同样，通过调度器界面进行的任何更改也会触发 Backbone 集合中的相应事件。

整个流程非常简单。关键在于使用 [backbone](api/method/backbone.md) 方法，而不是通常的 [load](api/method/load.md) 或 [parse](api/method/parse.md) 方法。


[backbone](api/method/backbone.md) 方法确保调度器与 Backbone 模型中的所有数据变化保持同步，反之亦然。
它接受一个 Backbone 集合作为参数。


[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)
