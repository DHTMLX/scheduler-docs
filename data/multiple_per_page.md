Creating Multiple Schedulers on a Page 
==============

{{pronote
This functionality is available in the Scheduler PRO version (Commercial, Enterprise and Ultimate licenses) only.
}}

As you have probably noticed at the very beginning of your work with the library, dhtmlxScheduler is a static object, i.e. _only one instance_ of dhtmlxScheduler can exist on the page.

Now, for the PRO version, we should rephrase that statement and say: _more than one instance_ of dhtmlxScheduler can exist on the page. You still have one default instance of scheduler, which can be accessed by the global **scheduler** object, but you can also create new scheduler objects.

To create a new instance of dhtmlxScheduler, use the **Scheduler.getSchedulerInstance()** method:

~~~js
// Beware, 'Scheduler' in the command goes with the capital letter
[instanceName] = Scheduler.getSchedulerInstance();
~~~

Now configure your new instance, initialize it and populate with data, as usual. And don't forget to add a standard set of DIV containers for its elements.

Let's take a simple example: 2 schedulers, one under another: 


~~~js
function init() {
    scheduler1  = Scheduler.getSchedulerInstance();
	scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
	scheduler1.load("/data/events")
	
	scheduler2 = Scheduler.getSchedulerInstance();
	scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
	scheduler2.load("/data/events")	
}

~~~


~~~js
<body onload="init();">
	<div id="scheduler_here" class="dhx_cal_container" ...>
		...
	</div>
	<br>
	<div id="scheduler_here_2" class="dhx_cal_container" ...>
		...
	</div>	
</body>

~~~

Related articles
------------------

- datastore_integration.md
- dhxlayout_integration.md


@edition: pro
