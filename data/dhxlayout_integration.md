Integration with dhtmlxLayout
=============================

A good way to place [multiple schedulers](multiple_per_page.md) on the page is using dhtmlxLayout. It not only provides a beautiful frame, but also ensures correct interacting
with other elements on the page and acting according to the page size changes. 

{{note Note that dhtmlxLayout is not a part of the dhtmlxScheduler library.
There are two versions of Layout you can choose from, depending on the version of the dhtmlxSuite library.}}

dhtmlxSuite v5+
------------------------

In this version dhtmlxLayout can be used as a separate product or as a part of the dhtmlxSuite library. To use dhtmlxLayout v5.X in your application, you should 
[purchase the license](https://dhtmlx.com/docs/products/dhtmlxSuite5/).


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

dhtmlxSuite v6+
------------------------

Starting from dhtmlxSuite 6.0, dhtmlxLayout can't be obtained separately from the whole Suite library.
If you're going to use this approach, you should purchase the license of
the [Suite 6.X library](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing).

dhtmlxScheduler of [version 5.3](what_s_new.md#53) and newer implements a common View interface used in dhtmlxSuite v6+ and can be
[attached to any cell directly](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// create and configure the scheduler instance
scheduler.config.header = [
   "day",
   "week",
   "month",
   "date",
   "prev",
   "today",
   "next"
];
scheduler.config.multi_day = true;

// after the scheduler is attached, onSchedulerReady will be fired
scheduler.attachEvent("onSchedulerReady", function () {
	requestAnimationFrame(function(){
    	// here you can set the initial view and date and load the data
		scheduler.setCurrentView(new Date(2017,5,3), "week");
		scheduler.load("../common/events.json");
	});
	
});

const layout = new dhx.Layout("layout", {
	rows: [{
		id: "scheduler-cell",
		header: "Appointment Scheduler",
		html:"<div></div>"
	}]
});
layout.cell("scheduler-cell").attach(scheduler);
~~~

###Pay attention

- Note, that `dhtmlxSuite Layout` is asynchronous, the scheduler won't be initialized right after the `.attach` call.
- You'll need to capture "onSchedulerReady" for any post-initialization settings.
- Currently **there is no way to specify scheduler markup when it's used together with dhtmlxSuite v6+**, 
which means you'll need to use the api/scheduler_header_config.md config to specify controls of the navigation panel.
