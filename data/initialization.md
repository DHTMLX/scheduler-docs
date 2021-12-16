Initializing Scheduler on a Page
================================

When you develop an application with dhtmlxScheduler, the first thing you need is to initialize or, simply speaking, to display the Scheduler on the page.

There are two ways of initializing scheduler on a page:

- via the scheduler's markup
- via the header configuration property

Initializing Scheduler via markup
------------------------------------

To display a basic Scheduler on the page through the markup, follow 3 steps: 

1. Include the [dhtmlxScheduler code files](#requiredcodefiles) on the page.
2. Create a DIV container on the page and define the related DIV containers for its elements.
3. Initialize dhtmlxScheduler in the newly created container with the api/scheduler_init.md method. As a parameter the method takes an HTML container (or its id) that the Scheduler will be displayed in.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
        type="text/css">
</head>
<body>
	<!--Container for Scheduler and the standard set of 'divs'-->
   <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100vh;'>
		<div class="dhx_cal_navline">
    		<div class="dhx_cal_prev_button">&nbsp;</div>
        	<div class="dhx_cal_next_button">&nbsp;</div>
        	<div class="dhx_cal_today_button"></div>
        	<div class="dhx_cal_date"></div>
        	<div class="dhx_cal_tab" name="day_tab"></div>
        	<div class="dhx_cal_tab" name="week_tab" ></div>
       		<div class="dhx_cal_tab" name="month_tab"></div>
   		</div>
    	<div class="dhx_cal_header"></div>
    	<div class="dhx_cal_data"></div>       
   </div>
   <script type="text/javascript">
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](init_scheduler_front.png)

{{sample
	01_initialization_loading/01_basic_init.html
}}


Initializing Scheduler via header config
--------------------------------------------------------------

You need to initialize scheduler this way to make it [responsive](initialization.md#makingschedulerresponsive).

To display a basic Scheduler on the page, take the following steps:

1. Include the [dhtmlxScheduler code files](#requiredcodefiles) on the page.
2. Create a DIV container on the page.
3. Specify the structure of the scheduler in the api/scheduler_header_config.md configuration object. 
4. Initialize dhtmlxScheduler in the newly created container with the api/scheduler_init.md method. As a parameter the method takes an HTML container (or its id) that the Scheduler will be displayed in.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
        type="text/css">
</head>
<body>
   <!--Container for Scheduler-->
   <div id="scheduler_here" style='width:100%; height:100%;'>
   </div>
</body>   
<script>
	//The structure of the scheduler
	scheduler.config.header = [
		"day",
		"week",
		"month",
		"date",
		"prev",
		"today",
		"next"
	];
	scheduler.init('scheduler_here',new Date(2020,0,1),"week"); /*!*/
</script>
</html>
~~~

{{sample
	01_initialization_loading/13_touch_ui.html
}}
 
Required code files
---------------------

The required code files are:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css* (for Material skin; you can also [explore the available skins](skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
   		type="text/css">
~~~

Let's quickly explore the structure of the dhtmlxScheduler package to find out where to look for the files. 

- <b>sources</b> - the source code files of the library. The files are not minified and easy-to-read. The package is mostly intended to be used for component's debugging.
{{note Note that the **Trial** version of the Scheduler library doesn't contain the **sources** folder.}}
- <b>samples</b> - the code samples.
- <b>codebase</b> - the packed code files of the library. These files have much smaller size and intended for use in production. <b>In your apps you need to use files from this folder.</b>


Scheduler sizing
------------

Scheduler takes up the whole size of its container element (*scheduler_here* div in the above example) without expanding it.
Which means that if you don't specify the container height or set it to 0, scheduler will also have zero height and won't be displayed.

In our samples we usually make scheduler full-screen by giving 100% width and height to both the document body and scheduler container element:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

It can easily go wrong if you place the *scheduler_here* element into a div with default sizes:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div class="outer_container"> /*!*/
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%;height:100%;">
~~~

Scheduler won't be correctly displayed in this case, because "scheduler_here" is set to 100% of its parent, and the size of its parent is not specified.

If you use relative sizes (%, percents) for the *.dhx_cal_container* element, make sure that its parent element also has some height set. Otherwise, the resulting height might be zero and scheduler won't be displayed.

Or, you can use different units for the main scheduler div sizes. The following elements will have expected sizes regardless of the styles of outer elements:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

or:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

###Scheduler autoresizing

There is a possibility to enable automatic resizing for the scheduler container. You just need to enable the <b>container_autoresize</b> extension on the page:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

{{sample
03_extensions/28_container_autoresize.html
}}

As a result, scheduler container will change its size automatically and show the whole content without scrolling.

Making Scheduler responsive
-----------------------------

When you initialize Scheduler via [the header configuration property](#initializingschedulerviaheaderconfig) you'll be able to choose the header structure that fits the screen size of the client.
It will also apply certain styles which will make elements and font sizes responsive on small screens.

You can find more details in a separate article: touch_support.md.

Import files into ES6/7 and TypeScript apps
---------------------------------------------

Use the following command to import files:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

For the Commercial, Enterprise or Ultimate version the command looks like this:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

React example
------------------

An example of importing dhtmlxScheduler files into a React-based app:

~~~js
import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
export default class Gantt extends Component {
  componentDidUpdate() {
    gantt.render();
  }
  componentDidMount() {
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }
 
  render() {
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
~~~

Angular example
-----------------

An example of importing dhtmlxScheduler files into an Angular-based app:

~~~js
import {Component,ElementRef,OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import {TaskService} from '../services/task.service';
import {LinkService} from '../services/link.service';
import {Task} from '../models/task';
import {Link} from '../models/link';
 
 
import { gantt, Gantt } from 'dhtmlx-gantt';
 
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here') ganttContainer: ElementRef;
 
    constructor(private taskService:TaskService, private linkService:LinkService){ }
 
    ngOnInit() {
        gantt.config.xml_date = '%Y-%m-%d %H:%i';
        gantt.init(this.ganttContainer.nativeElement);
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
            });
    }
}
~~~

Include files into a RequireJS-based app
------------------------------------------- 

To include dhtmlxScheduler files into a RequireJS-based app, you need to follow the logic shown in the example below:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt;// for Enterprise builds
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

The dhtmlxScheduler library will return an object with fields `scheduler` and `Scheduler` (in Commercial, Enterprise or Ultimate versions) - the *scheduler* and *Scheduler* objects described [here](multiple_per_page.md).

{{note  When using Gantt with custom extensions in RequireJS, you should specify the `shim` config for RequireJS and directly set the dependency of extensions from Scheduler in it.}}

The example below demonstrates how a custom extension file *custom_tooltip_plugin.js* can be set in the correct way:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
  },
  shim: {
    "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
  }
});
 
requirejs(["dhtmlxgantt"], 
function (dhx) {
  var gantt = dhx.gantt;

  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the 'codebase' folder of the package* plus *the filename*, for instance:

**core library:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"


