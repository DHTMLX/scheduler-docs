Backbone Integration
===========================================
From the version 4.0, the library provides a special extension **'ext/dhtmlxscheduler_mvc.js'** that allows you to integrate the scheduler  with the Backbone library.

If you have a Backbone-based application and want to add the scheduler there (still managing data with Backbone), use the following technique:

<ol>
	<li>
    Include the dhtmlxScheduler files to the app:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<script src="../../codebase/ext/dhtmlxscheduler_mvc.js?!"></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
	</li>
    <li> Initialize and configure the scheduler in a usual way:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
	</li>
    <li>Now you can create a data collection in backbone and link scheduler to it:
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
    </li>
</ol>

After that scheduler will load data from collection and will reflect any updates in it. Also, any changes through scheduler's UI will trigger related events in the backbone's collection. 


As you see, it's fairy simple. All you need is to use the api/scheduler_backbone.md method instead of usual api/scheduler_load.md or api/scheduler_parse.md ones.<br> 
The api/scheduler_backbone.md method makes the scheduler reflect all data changes in the Backbone model and vice versa.
As a parameter, the method takes a Backbone collection.

{{sample
	10_integration/07_backbone.html
}}


