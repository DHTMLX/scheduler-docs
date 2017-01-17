Live Update Mode
==============
Live Update is a mode that provides synchronous data update in real time. 
When one of the users makes a change, it becomes visible to all others immediately. 
The mode uses the Faye socket library to make the process as fast and flexible as possible 
and doesn't require page refreshes (updates just a component it's applied to).

In this article we would like to give you a step-by-step tutorial to quickly dive into the topic.

##Before you begin
To start this tutorial you must have a complete running dhtmlxScheduler application integrated with the server side, i.e. one that loads data from DB and saves changes back (see details [here](how_to_start.html)).

![default_skin.png](default_skin.png)

Shortly, the code of this app can look like this:


~~~js
<script>
	function init() {
		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.init('scheduler_here',new Date(2009,05,24),"week");
		scheduler.load("php/scheduler.php");

		var dp = new dataProcessor("php/scheduler.php");
		dp.init(scheduler);
	}
</script>

~~~


##Node. js
{{note


The first requirement of the mode - having Node.js installed and running.

}}

The essential requirement of the live update mode is having the **Node.js** platform (event-driven I/O server-side JavaScript environment based on V8) installed and running. That's why, by your first step you must set up **Node.js**.


## Step 1. Set up node.js 
We won't go into detail on setting up the platform ( as it really doesn't concern the main purpose of this tutorial) and confine ourselves to mentioning just the common technique:



1.  Install **Node.js**;
2.  Download the **gridLive_nodejs.zip** package. Don't be confused by the name of the package, it's used for all supported components including dhtmlxScheduler ([download link](http://dhtmlx.com/x/download/regular/gridLive_nodejs.zip));
3.  Unzip the package and copy the **nodejs** folder into the root directory of your web server.
4.  Execute in the command line: **node nodejs/server.js**.

Other required information on this topic you can read on the respective sites, e.g. here - http://nodejs.org.



##Step 2. Include additional files

To work with the live update mode, 2 additional files must be included. They are: 



+ _live_updates.js_ (a file located locally);
+ _sync.js_ (a file located on the Node.js server).


~~~js
<script src="codebase/live_updates.js" type="text/javascript"></script>
<script type="text/javascript" src="http://localhost:8008/sync.js"></script>

~~~



##Step 3.  Call the method *live_updates()* for dataProcessor 
The mode is enabled by calling method **live_updates()** for the dataProcessor instance. That's why the other essential requirement is **having dataProcessor initialized**. As a parameter, the method takes the path to JS server.


~~~js
var dp = new dataProcessor("php/update.php");

dp.live_updates("http://localhost:8008/sync");
dp.init(scheduler);

~~~


The demo application you can download [here](http://dhtmlx.com/x/download/regular/tutorials/dhtmlxScheduler.LiveUpdate.zip).