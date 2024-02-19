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
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
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
        	<div class="dhx_cal_tab" data-tab="day"></div>
        	<div class="dhx_cal_tab" data-tab="week" ></div>
       		<div class="dhx_cal_tab" data-tab="month"></div>
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
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
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
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
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
import { scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
 
export default class Scheduler extends Component {
    componentDidUpdate() {
        scheduler.render();
    }
    componentDidMount() {
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next"
        ];
        scheduler.init(this.schedulerContainer, new Date(), "week");
        scheduler.parse(this.props.events);
    }
 
    render() {
        return (
            <div
              ref={(input) => { this.schedulerContainer = input }}
              style=width: '100%', height: '100%'
            ></div>
        );
    }
}
~~~

For the **Commercial, Enterprise or Ultimate** versions creating a new [scheduler object](multiple_per_page.md#destructorofscheduleranddataprocessorinstances) instead of the global instance is recommended:

~~~js
import React, { Component } from 'react';
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
 
export default class Scheduler extends Component {
    componentDidUpdate() {
        this.scheduler.render();
    }
    componentDidMount() {
    	this.scheduler = Scheduler.getSchedulerInstance();
        const scheduler = this.scheduler;
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next"
        ];
        scheduler.init(this.schedulerContainer, new Date(), "week");
        scheduler.parse(this.props.events);
    }
    
    componentDidUnmount() {
        this.scheduler.destructor();
        this.scheduler = null;
    }
 
    render() {
        return (
            <div
              ref={(input) => { this.schedulerContainer = input }}
              style=width: '100%', height: '100%'
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
import {CalendarEventsService} from '../services/calendar.events.service';
import {Event} from '../models/event';
 
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
 
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'scheduler',
    styleUrls: ['./scheduler.component.css'],
    providers: [CalendarEventsService],
    template: `<div #scheduler_here class='scheduler-contaier'></div>`,
})
export class SchedulerComponent implements OnInit {
    @ViewChild('scheduler_here') schedulerContainer: ElementRef;
 
    constructor(private eventsService:CalendarEventsService){ }
 
    ngOnInit() {
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next"
        ];
        scheduler.init('scheduler_here',new Date(),"week");
        this.eventsService.get().then((events) => {
            scheduler.parse(events);
        });
    }
}
~~~

For the **Commercial, Enterprise or Ultimate** versions creating a new [scheduler object](multiple_per_page.md#destructorofscheduleranddataprocessorinstances) instead of the global instance is recommended:

~~~js
import {Component,ElementRef,OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import {CalendarEventsService} from '../services/calendar.events.service';
import {Event} from '../models/event';
 
import { Scheduler } from 'dhtmlx-scheduler';
 
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'scheduler',
    styleUrls: ['./scheduler.component.css'],
    providers: [CalendarEventsService],
    template: `<div #scheduler_here class='scheduler-contaier'></div>`,
})
export class SchedulerComponent implements OnInit {
    @ViewChild('scheduler_here') schedulerContainer: ElementRef;
 
    constructor(private eventsService:CalendarEventsService){ }
 
    ngOnInit() {
        this.scheduler = Scheduler.getSchedulerInstance();
        const scheduler = this.scheduler;
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next"
        ];
        scheduler.init('scheduler_here',new Date(),"week");
        this.eventsService.get().then((events) => {
            scheduler.parse(events);
        });
    }
    ngOnDestroy() {
        this.scheduler.destructor();
        this.scheduler = null;
    }
}
~~~


Include files into a RequireJS-based app
------------------------------------------- 

To include dhtmlxScheduler files into a RequireJS-based app, you need to follow the logic shown in the example below:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    var scheduler = dhx.scheduler;
    var Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

The dhtmlxScheduler library will return an object with fields `scheduler` and `Scheduler` (in Commercial, Enterprise or Ultimate versions) - the *scheduler* and *Scheduler* objects described [here](multiple_per_page.md).

{{note  When using Scheduler with custom extensions in RequireJS, you should specify the `shim` config for RequireJS and directly set the dependency of extensions from Scheduler in it.}}

The example below demonstrates how a custom extension file *custom_tooltip_plugin.js* can be set in the correct way:

~~~js
requirejs.config({
    paths: {
        "dhtmlxscheduler": "../../codebase/dhtmlxscheduler",
        "ext/dhtmlxscheduler_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxscheduler_custom_tooltip": ["dhtmlxscheduler"]
    }
});
 
requirejs(["dhtmlxscheduler"], 
function (dhx) {
    var scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the 'codebase' folder of the package* plus *the filename*, for instance:

**core library:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"


