Creating Multiple Schedulers on a Page 
==============

{{pronote
This functionality is available in the Scheduler PRO version (Enterprise license) only.
}}

##Common

As you have probably noticed at the very beginning of your work with the library, dhtmlxScheduler is a static object, i.e. _only one instance_ of dhtmlxScheduler can exist on the page.

Now, for the PRO version, we should rephrase that statement and say: _more than one instance_ of dhtmlxScheduler can exist on the page. You still have one default instance of scheduler, which can be accessed by the global **scheduler** object, but you can also create new scheduler objects.

To create a new instance of dhtmlxScheduler, use the following command:

~~~js
//Beware, 'Scheduler' in the command goes with the capital letter
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

##Synchronization with dhtmlxDataStore

In this sub-chapter we want to consider synchronizing multiple schedulers through a [dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html) object, from which the schedulers are being populated with data 
(so an event changed in one scheduler will be reflected in the other one).

{{note Note that dhtmlxDataStore is a part of the [dhtmlxSuite](https://dhtmlx.com/docs/products/dhtmlxSuite/), and it's not included in dhtmlxScheduler package. However, if you don't have dhtmlxSuite license, you can 
still use dhtmlxDataStore with dhtmlxScheduler for free. Please follow the steps below to use the component in your app.}}

- [Download dhtmlxDataStore package](https://files.dhtmlx.com/30d/33230caa09f4b5030ea5bfe374ef6d57/dhtmlxDataStore.zip)
- Include *dhtmlxcommon.js* and *datastore.js* after dhtmlxscheduler.js on your page. Keep to the order of files given below:

~~~js
<script src="dhtmlxscheduler.js"></script>
<script src="datastore/dhtmlxCommon/codebase/dhtmlxcommon.js"></script>
<script src="datastore/datastore.js"></script>
~~~

The common technique of synchronizing Schedulers via DataStore looks like this:

~~~js
function init() {
	var data = new dhtmlXDataStore({
		url:"data/data.json",
		scheme:{
			$init:function(obj){
				if (typeof obj.start_date == "string"){
					obj.start_date = scheduler.templates.parse_date(obj.start_date);
					obj.end_date = scheduler.templates.parse_date(obj.end_date);
				}
			}
		}
	});

    scheduler1 = Scheduler.getSchedulerInstance();
	scheduler1.init('scheduler_here',new Date(2019,05,12),"week");
	scheduler1.sync(data, { copy:true });
	

	scheduler2 = Scheduler.getSchedulerInstance();
	scheduler2.init('scheduler_here_too',new Date(2019,05,12),"month");
	scheduler2.sync(data, { copy:true });
}
~~~


Let's discuss what we've done in the above code snippet.


1.  First of all, we initialize dhtmlXDataStore in its usual way (for details, see chapters [Initialization](https://docs.dhtmlx.com/datastore__initialization.html),
[Data scheme](https://docs.dhtmlx.com/datastore__data_scheme.html) of the [dhtmlXDataStore documentation](https://docs.dhtmlx.com/datastore__index.html)).
2.  Then, we add 2 schedulers. Again, we do this in the usual manner, except for the use of the [sync](https://docs.dhtmlx.com/api__datastore_sync.html) method.

The [sync](https://docs.dhtmlx.com/api__datastore_sync.html) method binds schedulers with DataStore and takes 2 parameters:


+ **data** - (mandatory) a dhtmlXDataStore instance, the scheduler will get data from.
+ **{copy:true}** -  (mandatory) creates an individual copy of DataStore data for the scheduler.

Let's give a special attention to the 2nd parameter, as it has a special purpose, and applicable only  to dhtmlxScheduler (therefore isn't described in the main dhtmlXDataStore documentation).

The parameter 'says' to DataStore to create a copy of data for the component, i.e. in the example above: _DataStore_, _scheduler1_ and _scheduler2_ have their own datasets. 
But it doesn't mean that you should provide some logic to sync these datasets - everything is made automatically, as usual. You change something in the scheduler, the change immediately goes to DataStore, which updates its dataset
and passes the update to the second scheduler. 

At this point, you  might ask yourself: "What are these difficulties for, if we have the same behavior?".
  
Here is the answer: besides the main data properties, each event has bags of inner ones, that Scheduler assigns to the event while running. These assigned properties continuously change their values, depending on the selected view. You can simply face the situation, when the user changes an event, which is opened in both schedulers at the same time, but in different views. As a result, mismatch of the values of the same inner property in the different views will cause incorrect event displaying.  

So, in our case we use the parameter (**{copy:true}**) only to ensure the correct processing. But in some situations such data duplication can really be useful.
     For example, you have 2 schedulers on the page. In both schedulers you use the same events BUT want to display them in different time zones (e.g. Moscow and London).  Having one dataset doesn't allow you to solve this task, but having 3 datasets does! 

{{sample
	10_integration/04_datastore.html
}}

##Integration with dhtmlxLayout

A good way to place schedulers on the page is using [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html). It not only provides a beautiful frame, but also ensures correct interacting
with other elements on the page and acting according to the page size changes. 

{{note Note that dhtmlxLayout is a separate product, not a part of the dhtmlxScheduler library. If you would like to use dhtmlxLayout in your application, you should purchase the license. 
Please [check the licensing options](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses).}}


**To attach a dhtmlxScheduler instance to a layout cell**, use the [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html) method.
  
**Note**, attaching scheduler to a cell automatically initializes it. So, configure scheduler before placing it into the layout.

~~~js
function init() {
	var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

	sched1 = Scheduler.getSchedulerInstance();
	sched1.config.multi_day = true;
	dhxLayout.cells("a").attachScheduler(new Date(2019,05,30),"week",null,sched1);
	sched1.load("/data/units")
		
	sched2 = Scheduler.getSchedulerInstance();
	dhxLayout.cells("b").attachScheduler(new Date(2019,05,30),"month",null,sched2);
	sched2.load("/data/units")
}

~~~

{{sample
	10_integration/05_dhtmlxlayout_terrace.html
}}

@edition: pro
