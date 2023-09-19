Drag-and-Drop Operations 
==================================
The library provides the **outerdrag** extension that allows creating new events by dragging elements from external 
DHTMLX components or other schedulers. 

Dragging from external components
--------------------------------------------
Once the user drags some external element to the scheduler, the scheduler opens the lightbox for creating a new event.

<br>

<img src="external_dnd.png"/>

{{sample
10_integration/02_dhtmlxtree_outer_drag.html
}}

<br>

Let's consider external drag-and-drop in the context of the <a src="http://docs.dhtmlx.com/doku.php?id=dhtmlxtree:toc">dhtmlxTree component</a>.


Follow these steps, to integrate the scheduler with <a src="http://docs.dhtmlx.com/doku.php?id=dhtmlxtree:toc">dhtmlxTree</a>: 

<ol>
	<li><a href="https://dhtmlx.com/docs/download/">Download</a> the  dhtmlxTree package and unzip its content to [YOUR APPLICATION ROOT] folder</li>
    <li>Include the necessary <b>js</b> and <b>css</b> files on the page:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
	</li>
	<li>Activate the <a href="extensions_list.md#outerdrag">outerdrag</a> extension on the page:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
	</li>
    <li>Initialize dhtmlxTree component (see instructions <a href="https://docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html">here</a>) :
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
	</li>
    <li>Enable drag-and-drop in the dhtmlxTree component (see instructions <a href="https://docs.dhtmlx.com/tree__drag_and_drop_handling.html">here</a>) :
~~~js
tree.enableDragAndDrop(true);
~~~
	</li>
    <li>Initialize and configure the scheduler:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
</li>
	<li>Attach a handler to the api/scheduler_onexternaldragin_event.md event to set how the text of the dragged element will be converted to a property of the event:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
	var label = tree.getItemText(tree._dragged[0].id);
	scheduler.getEvent(id).text = label;
	return true;
});

~~~
	</li>
</ol>

{{sample
10_integration/02_dhtmlxtree_outer_drag.html
}}


Now, you can easy create new events, containing tree data - just drag and drop the desired node.


Drag-and-drop between schedulers
-----------------------------------------------

{{note
The functionality is available for the Commercial (since October 6, 2021), Enterprise and Ultimate licenses only.
}}


If you display  [multiple schedulers on a page](multiple_per_page.md), you can enable drag-and-drop operations between them so users could drag events from one scheduler to another and vice versa.

To enable drag-and-drop support for scheduler, just include the "**drag_between**" extension on the page:

{{snippet
Enabling drag-and-drop support for several schedulers
}}
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


###Denying dragging events to/from one of schedulers
To deny dragging events from a scheduler, set the api/scheduler_drag_out_config.md property to *false*:

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

<br>

To deny dragging events to a scheduler, set the api/scheduler_drag_in_config.md property to *false*:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


###Drag events

- api/scheduler_onbeforeeventdragout_event.md -  fires before the dragged event is moved out of the scheduler
- api/scheduler_oneventdragout_event.md - fires when a dragged event  is moved out of the scheduler
- api/scheduler_onbeforeeventdragin_event.md - fires before a dragged event is moved over the scheduler
- api/scheduler_oneventdragin_event.md - fires when a dragged event is moved over the scheduler
- api/scheduler_oneventdropout_event.md - fires when a dragged event  is dropped onto the area out of the scheduler


