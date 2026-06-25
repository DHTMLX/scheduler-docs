---
title: "Backbone 集成（遗留）"
sidebar_label: "Backbone 集成（遗留）"
---

# Backbone 集成（遗留）

:::warning
本文描述了一个遗留的集成方案。如果你是从头开始，请参阅框架集成或纯 JavaScript 设置。
:::

从 4.0 版本开始，库提供了一个名为 [**mvc**](guides/extensions-list.md#legacy) 的特殊扩展，允许你将调度程序与 Backbone 库集成。

如果你有一个基于 Backbone 的应用程序并希望在那里添加调度程序（仍然使用 Backbone 管理数据），请使用以下技术：

1. 将 dhtmlxScheduler 文件包含到应用中：
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. 在页面上激活 <b>mvc</b> 扩展：
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. 以通常的方式初始化和配置调度程序：
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. 现在你可以在 backbone 中创建数据集合并将调度程序链接到它：
~~~js
//你可以在这里使用任何模型
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //link scheduler to collection
~~~

之后，调度程序将从集合加载数据并反映其中的任何更新。此外，调度程序 UI 的任何更改都会在 backbone 的集合中触发相关事件。

正如你所看到的，它相当简单。你所需要做的只是使用 [backbone](api/method/backbone.md) 方法，而不是通常的 [load](api/method/load.md) 或 [parse](api/method/parse.md) 方法。

 
[Backbone 集成](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)