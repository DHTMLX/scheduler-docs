Creating Multiple Schedulers on a Page 
==============

{{pronote
This functionality is available in the Scheduler PRO version (Commercial, Enterprise and Ultimate licenses) only.
}}

As you have probably noticed at the very beginning of your work with the library, dhtmlxScheduler is a static object, i.e. _only one instance_ of dhtmlxScheduler can exist on the page.

Now, for the PRO version, we should rephrase that statement and say: _more than one instance_ of dhtmlxScheduler can exist on the page. You still have one default instance of scheduler, which can be accessed by the global **scheduler** object, but you can also create new scheduler objects.

Scheduler Instance Configuration
-----------------------------

To create a new instance of dhtmlxScheduler, use the **Scheduler.getSchedulerInstance()** method:

~~~js
// Beware, 'Scheduler' in the command goes with the capital letter
const scheduler = Scheduler.getSchedulerInstance();
~~~

The method can take a configuration object as a parameter:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true,
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id:1, start_date: "2022-04-18 09:00", end_date: "2022-04-18 12:00", 
				text:"English lesson", subject: 'english' },
            { id:2, start_date: "2022-04-20 10:00", end_date: "2022-04-21 16:00", 
				text:"Math exam", subject: 'math' },
            { id:3, start_date: "2022-04-21 10:00", end_date: "2022-04-21 14:00", 
				text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2022-04-23 16:00", end_date: "2022-04-23 17:00", 
				text:"English lesson", subject: 'english' },
            { id:5, start_date: "2022-04-22 09:00", end_date: "2022-04-22 17:00", 
				text:"Usual event" }
        ]
    }
});
~~~

The config object can contain the following properties:

- **container** - (*string|HTMLElement*) an HTML container (or its id) that the Scheduler will be displayed in. If not specified, Scheduler will be initialized without a container.
- **config** - (*object*) an object with configuration settings of the Scheduler
- **xy** - (*object*) an object with [sizes of the scheduler's elements](api/scheduler_xy_other.md)
- **templates** - (*object*) an object with templates 
- **events** - (*object*) an object with event handlers. <br>
You need to use the following format while specifying event handlers for a new instance of Scheduler:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
        	var task = scheduler.getEvent(id);
            task.owner = null;
            return true;
        },
        onClick: function(id, e){
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- **data** - (*object|string*) an object with data to load or the URL to load data from
- **plugins** - (*object*) extensions that need to be activated
- **locale** - (*string|object*) a two-letter language code or an object of the locale that needs to be activated

**Note**, that calling the **Scheduler.getSchedulerInstance()** method without parameters will return the scheduler object with default configuration settings.
Therefore, you need to configure your new instance, initialize it and populate with data, as usual.

Let's take a simple example: 2 schedulers, one under another: 


~~~js
window.addEventListener("DOMContentLoaded", function(){
    var scheduler1  = Scheduler.getSchedulerInstance();
	scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
	scheduler1.load("/data/events")
	
	var scheduler2 = Scheduler.getSchedulerInstance();
	scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
	scheduler2.load("/data/events")	
)};

<body>
	<div id="scheduler_here" style="width:100%; height: 50%;"></div>
	<div id="scheduler_here_2" style="width:100%; height: 50%;"></div>	
</body>
~~~

Destructor of Scheduler and DataProcessor instances
------------------------------------

Starting from version 6.0, the dhtmlxScheduler object has a api/scheduler_destructor.md that can be used to dispose unnecessary instances of the Scheduler.

The destructor of the scheduler instance can be used as follows:

~~~js
var myScheduler = Scheduler.getSchedulerInstance();
 
//destroying a scheduler instance
myScheduler.destructor();
~~~

The destructor will implement the following tasks:

- clear the data loaded into a scheduler instance
- destroy the dataProcessor (if it is attached to the scheduler) 
- detach the scheduler from DOM
- detach all DOM events attached via the [scheduler.event()](api/scheduler_event.md) method

###Using destructor with Angular

Here is an example of using the destructor to dispose a scheduler instance while using the Angular framework:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // configure and init
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

###Detaching the dataProcessor

Calling the destructor of data processor will clear the dataProcessor instance and detach it from the scheduler. For example:

~~~js
var scheduler = Scheduler.getSchedulerInstance();
var dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// destroys data processor and detaches it from the scheduler
dp.destructor();
~~~

{{note 
If you use a package that does not allow creating multiple instances of the scheduler object (GPL or Commercial editions), calling the scheduler destructor will make the scheduler inaccessible until page reload.
}}

Related articles
------------------

- datastore_integration.md
- dhxlayout_integration.md


@edition: pro
