Initializing Scheduler on a Page
================================

When you develop an application with dhtmlxScheduler, the first thing you need is to initialize or, simply speaking, to display the Scheduler on the page.

There are two ways of initializing scheduler on a page:

- via scheduler's markup
- via layout configuration property

Initializing Scheduler via Markup
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
   <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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


Initializing Scheduler via layout configuration property
--------------------------------------------------------------

You need to initialize scheduler this way to make it  [responsive](initialization.md#makingschedulerresponsive).

To display a basic Scheduler on the page, take the following steps:

1. Include the [dhtmlxScheduler code files](#requiredcodefiles) on the page.
2. Create a DIV container on the page.
3. Specify the structure of the scheduler in the layout configuration object. 
4. Initialize dhtmlxScheduler in the newly created container with the api/scheduler_init.md method. As a parameter the method takes an HTML container (or its id) that the Scheduler will be displayed in.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
        type="text/css">
</head>
<body onload="init();">
   <!--Container for Scheduler-->
   <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
   </div>
</body>   
<script type="text/javascript">
   //The structure of the scheduler
   scheduler.config.layout = [
			{ 
				view: "navbar",
				items: [
				{
					type: "button",
					value: "prev"
				},
				{
					type: "button",
					value: "next"
				},
				{
					type: "button",
					value: "today"
				},
				{
					type: "date"
				},
				{
					type: "tab",
					value: "day"
				},
				{
					type: "tab",
					value: "week"
				},
				{
					type: "tab",
					value: "week_unit"
				},
				{
					type: "tab",
					value: "single_unit"
				},
				{
					type: "tab",
					value: "month"
				}
			]},
			{ view: "header" },
			{ view: "dataArea" }
		];
   scheduler.init('scheduler_here',new Date(2018,0,1),"week"); /*!*/
   </script>
</html>
~~~

{{sample
	01_initialization_loading/14_responsive_scheduler.html
}}
 
Required code files
---------------------

The required code files are:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css* (for Material skin; you can also [explore the available skins](skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
   		type="text/css">
~~~

Let's quickly explore the structure of the dhtmlxScheduler package to find out where to look for the files. 

- <b>sources</b> - the source code files of the library. The files are not minified and easy-to-read. The package is mostly intended to be used for component's debugging.
{{note Note that the **Trial** version of the Scheduler library doesn't contain the **sources** folder.}}
- <b>samples</b> - the code samples.
- <b>docs</b> - the full documentation of the component.
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
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;"/>
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

There is a possibility to enable automatic resizing for the scheduler container. You just need to include the <b>ext/dhtmlxscheduler_container_autoresize.js</b> extension file on the page:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_container_autoresize.js"></script>
~~~

{{sample
03_extensions/28_container_autoresize.html
}}

As a result, scheduler container will change its size automatically and show the whole content without scrolling.

Making Scheduler responsive
-----------------------------

When you initialize scheduler via [the layout configuration property](#initializingschedulervialayoutconfigurationproperty) it becomes responsive.

###Header

The elements of the scheduler header are rearranged depending on the screen size.

<img src="header_responsive.png"/>

In the image above scheduler is displayed on a small screen. To present all the header elements on the screen, the content of the header is set into 2 lines.

###Lightbox

Scheduler API provides the <b>responsive_lightbox</b> configuration option  that enables the responsiveness of the lightbox. 

~~~~js
scheduler.config.responsive_lightbox = true; //true by default
//you need to set this value to false to disable the responsiveness of the lightbox
~~~~
The elements of the lightbox adapt to a small screen in the image below:

<img src="lightbox_responsive.png"/>

{{sample
	01_initialization_loading/14_responsive_scheduler.html
}}

There is a possibility to customize the lightbox appearance when it is responsive. Set the additional CSS class <b>dhx_cal_light_responsive</b> for this purpose.


