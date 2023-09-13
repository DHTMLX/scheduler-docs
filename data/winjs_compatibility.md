dhtmlxScheduler in Windows Store Apps
==============

dhtmlxScheduler can be used in Windows Store applications written in JavaScript and HTML.

You need to download a special edition of dhtmlxScheduler - <a href="https://dhtmlx.com/x/download/regular/dhtmlxScheduler_windows.zip">https://dhtmlx.com/x/download/regular/dhtmlxScheduler_windows.zip</a>.


To make it easy to learn the topic, you can go through the step-by-step tutorial - [Basic Windows 8 app with dhtmlxScheduler](https://docs.dhtmlx.com/index.html).


##Files to include

You need to include 4 files to work with the dhtmlxScheduler library:


~~~js
//core files
<script src="/lib/dhtmlxscheduler.js"></script>
<link href="/lib/dhtmlxscheduler.css" rel="stylesheet" />
~~~

{{note
Note, here is the minimum set of files needed to run an app with dhtmlxScheduler. If you use the functionality that implemented in scheduler's extension(s), include the related extension file(s) additionally.
}}


##Initialization

The scheduler is initialized in a standard way:


- Firstly, in the app's start page  (by default, it's the  _default.html_ file), define a standard set of the div containers for scheduler's elements:
  
   
~~~js
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
            <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
            <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
        </div>
        <div class="dhx_cal_header">
        </div>
        <div class="dhx_cal_data">
        </div>       
</div>

~~~
 

- And then, initialize the scheduler (you can put the initialization code right into the **ready** function within the **app.onactivated** event handler):
  
~~~js
app.onactivated = function (args) {
	if (args.detail.kind === activation.ActivationKind.launch) {
    	if (args.detail.previousExecutionState !== 
        	activation.ApplicationExecutionState.terminated) {
 
          		WinJS.Utilities.ready(function(){ 
                     scheduler.init('scheduler_here'); 
          	}, true);
 
      	} else { }
      	args.setPromise(WinJS.UI.processAll());
   	}
};

~~~


##Scheduler configuration

Again, scheduler is [configured in a standard  way](configuration.md):


~~~js
WinJS.Utilities.ready(function(){ 
      scheduler.config.multi_day = true;
      scheduler.config.details_on_create = true;
      scheduler.config.details_on_dblclick = true;
      scheduler.init('scheduler_here', new Date(2012, 10, 1), "month");
}, true);

~~~
 

##Loading data

To load data to the scheduler you have to use the [parse](api/scheduler_parse.md) method:


~~~js
var storeItems = [
     { text:"Friday",  start_date:"11.04.2012 00:00",end_date:"11.05.2012 17:00" },
     { text:"New Year",start_date:"11.05.2012 14:00",end_date:"10.05.2012 17:00" },
     { text:"Birthday",start_date:"11.06.2012 16:00",end_date:"11.06.2012 17:00" }
];

WinJS.Utilities.ready(function(){ 
      scheduler.init('scheduler_here');
      scheduler.parse(storeItems, "json");
}, true);

~~~


###Mandatory data properties

You data items must contain the following mandatory properties:



+ **start_date** - the date when a task is scheduled to begin. The date format defined by the api/scheduler_date_format_config.md config option
+ **end_date** - the date when a task is scheduled to be completed. The date format defined by the api/scheduler_date_format_config.md config option
+ **text**  - the text of a task

###Available formats


+ [JSON](data_formats.md#json)
+ [XML](data_formats.md#xml)
+ [iCal](data_formats.md#ical)

##Managing Create/Update/Delete operations

Generally, scheduler uses DataProcessor to implement CRUD operations. But DataProcessor is incompatible with the Windows 8 apps. Therefore, in that apps you should use events and provide the processing logic manually.


+ api/scheduler_onconfirmedbeforeeventdelete_event.md - fires after the user has clicked on the delete button and confirmed the deletion
+ api/scheduler_oneventchanged_event.md - fires after the event has been edited and changes were saved (the user clicks the edit and save buttons, respectively)
+ api/scheduler_oneventadded_event.md - fires when the user adds a new event
+ _Note, when you create a new event in the scheduler, it gets an auto-generated id. When this event is saved in the data source, the auto-generated id can be replaced with the id given by the data source. 
In case the event's id has been changed in the data source, you can use the api/scheduler_changeeventid.md method to change the event's id in the scheduler, accordingly._


~~~js
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id, event){
       // your custom code
});

scheduler.attachEvent("onEventChanged", function (id, event) {
       // your custom code
});

scheduler.attachEvent("onEventAdded", function (id, event) {
       // your custom code
});
~~~

## An example of CRUD logic for the IndexedDB database

Here is a general example of implementing the 'insert' operation. The 'delete'/'update'/'read' operations can be implemented by analogy with the 'insert' operation.
~~~js
//connects to indexedDb and fires the callback in case of success
function connect(callback){
    try{
        var db = null;

        var req = window.indexedDB.open("SchedulerApp", 1);
        req.onsuccess = function (ev) {
            db = ev.target.result;
            if(callback)//fire a callback on connect
                callback(db);
        }

        req.onupgradeneeded = function(e){
            //The event is fired while connecting to the new database or 
            //on changing the version.
            //This is the only place for defining database structure(object stores)
            var db = ev.target.result;

            if (!db.objectStoreNames.contains("events")) {
                //create data store, set 'id' as autoincremental key
                var events = db.createObjectStore(
                	"events", 
                	{ keyPath: "id", autoIncrement: true }
                );
            }
        }
    }catch(e){
    }
}

//adds js object to the database and fires callback in case of success
function insertEvent(data, callback) {
    connect(function (db) {
        var store = db.transaction("events", "readwrite").objectStore("events");
        var updated = store.add(data);
        updated.onsuccess = function (res) {
            callback(res.target.result);
        }
    });
}

// uses all defined above with the dhtmlxScheduler
// when the user adds an event into the scheduler - it will be saved to the database
scheduler.attachEvent("onEventAdded", function (id) {
    var ev =copyEvent(scheduler.getEvent(id));//copyEvent -function for deep copying
    delete ev.id;//real id will be assigned by the database

    insertEvent(ev, function (newId) {
        scheduler.changeEventId(id, newId);//update event id in the app
    });
    return true;
});
~~~

##Not supported functionality 

There are some features of a standard scheduler that aren't supported in Windows Store apps. They are:


+ DataProcessor
+ Map view
+ Export to PDF