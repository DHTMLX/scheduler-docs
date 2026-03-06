---
title: "Backbone Integration (legacy)"
sidebar_label: "Backbone Integration (legacy)"
---

# Backbone Integration (legacy)

:::warning
This article describes a legacy integration. If you're starting fresh, see the framework integrations or vanilla JS setup.
:::


From the version 4.0, the library provides a special extension [**mvc**](guides/extensions-list.md#legacy) that allows you to integrate the scheduler with the Backbone library.

If you have a Backbone-based application and want to add the scheduler there (still managing data with Backbone), use the following technique:

1. Include the dhtmlxScheduler files to the app:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. Activate the <b>mvc</b> extension on the page:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. Initialize and configure the scheduler in a usual way:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. Now you can create a data collection in backbone and link scheduler to it:
~~~js
//you can use any model here
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //link scheduler to collection
~~~

After that scheduler will load data from collection and will reflect any updates in it. Also, any changes through scheduler's UI will trigger related events in the backbone's collection. 


As you see, it's fairy simple. All you need is to use the [backbone](api/method/backbone.md) method instead of usual [load](api/method/load.md) or [parse](api/method/parse.md) ones.

 
The [backbone](api/method/backbone.md) method makes the scheduler reflect all data changes in the Backbone model and vice versa.
As a parameter, the method takes a Backbone collection.


[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)
