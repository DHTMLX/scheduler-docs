Mobile Responsive Scheduler
==============

dhtmlxScheduler provides support for touch devices, such as:

- iOS devices (iPad, iPhone, iPod);
- Windows 10-based tablets and touch screen monitors;
- Android-based devices.

_The scheduler will work on smartphones as well, but due to the lack of screen space it will require manual configuration._

**Important tips!**


+ Touch support is enabled by default and provided in all modes of the scheduler.
+ If your app is intended to be used on the touch devices, we strongly recommend to use the ['material' skin](skins.md#materialskin), as it provides reasonably big and easy-to-touch buttons.
+ Usually it is a good idea to use a [Quick Info](extensions_list.md#quickinfo) if you expect mobile users
+ We recommend adding the meta tag below on the page. It will automatically make all elements of the scheduler larger, which will make it so much easier for the end users
   
~~~js
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

## Responsive layout

When you initialize scheduler via [the header configuration property](#initializingschedulervialayoutconfigurationproperty) you'll be able to chose the header structure that fits the screen size of the client.
It will also apply certain styles which will make elements and font sizes responsive on a small screens.


###Header


For example, you can rearrange the header into multiple rows:

<img src="header_responsive.png"/>

In the image above scheduler is displayed on a small screen. 

This setting can be changed dynamically, which allows you to define separate header configuration for large and small screens:


~~~js

// define configs

const compactHeader = {
	rows: [
		{ 
			cols: [
				"prev",
				"date",
				"next",
			]
		},
		{ 
			cols: [
				"day",
				"week",
				"month",
				"spacer",
				"today"
			]
		}
	]
};
			
const fullHeader = [
	"day",
	"week",
	"month",
	"date",
	"prev",
	"today",
	"next"
];

// add a swicth to select an appropriate config for a current screen size

function resetConfig(){
	let header;
	if (window.innerWidth < 1000) {
		header = compactHeader;
	} else {
		header = fullHeader;
	
	}
	scheduler.config.header = header;
	return true;
}

// apply the config initially and each time scheduler repaints or resizes:

resetConfig();
scheduler.attachEvent("onBeforeViewChange", resetConfig);
scheduler.attachEvent("onSchedulerResize", resetConfig);

scheduler.init("scheduler_here");

~~~

{{sample
	01_initialization_loading/13_touch_ui.html
}}


###Lightbox

Scheduler API provides the [responsive_lightbox](api/scheduler_responsive_lightbox_config.md) configuration option that enables the responsiveness of the lightbox. 

~~~~js
scheduler.config.responsive_lightbox = true; //true by default
//you need to set this value to false to disable the responsiveness of the lightbox
~~~~
The elements of the lightbox adapt to a small screen in the image below:

<img src="lightbox_responsive.png"/>

{{sample
	01_initialization_loading/13_touch_ui.html
}}

There is a possibility to customize the lightbox appearance when it is responsive. The lightbox will have an additional CSS class <b>dhx_cal_light_responsive</b> which you can use in your selectors.


## Touch configuration options 

Here is a list of configuration options which is related to mobile/responsive support:

{{links
- api/scheduler_header_config.md - specifies the header layout
- api/scheduler_touch_config.md - enables/disables the touch support in the scheduler
- api/scheduler_touch_drag_config.md - defines the time period in milliseconds that is used to differentiate the long touch gesture from the scroll gesture
- api/scheduler_touch_tip_config.md - enables/disables prompting messages in the right top corner of the screen
- api/scheduler_touch_swipe_dates_config.md - enables/disables prompting messages in the right top corner of the screen
- api/scheduler_responsive_lightbox_config.md - enables responsive styles for the lightbox (enabled by default)
}}


##Touch gestures in the scheduler


- **Double tap** -  works the same as double click in the normal scheduler (triggers event edition or creation);
- **Long tap and drag**  - moves or creates events;
- **Swipe** - switches view to the next|prev time span ([disabled by default](api/scheduler_touch_swipe_dates_config.md)).

##'Quick info' extension


Specially for providing touch functionality, the library is extended with the ["Quick Info" extension](extensions_list.md#quickinfo).

The extension allows you to replace the standard sidebar buttons and the simplified edit form 
(which are quite small and hard-to-target on touch devices) with new ones, bigger and handier.

To activate the big-buttons scheduler, include the ["Quick Info"](extensions_list.md#quickinfo) extension file on the page:

~~~js
<script src="../../codebase/ext/dhtmlxscheduler_quick_info.js"></script>
<script>
      scheduler.init('scheduler_here',new Date(2019,5,30),"day");
      ...
<script>
~~~

{{sample
	03_extensions/29_quick_info.html
}}

Once the extension is enabled, the scheduler automatically replaces standard buttons with large-size ones:

![quick_info_extension.png](quick_info_extension.png)

{{note
Note, the quick-info selection side menu and selection menu in  the standard scheduler  use the same configuration that is stored in the api/scheduler_icons_select_config.md object.
}}


The extension provides:


- **3 templates** 
{{links
- api/scheduler_quick_info_content_template.md - specifies the content of the pop-up edit form
- api/scheduler_quick_info_date_template.md - specifies the date of the pop-up edit form
- api/scheduler_quick_info_title_template.md - specifies the title of the pop-up edit form

}}

- **1 configuration option**

{{links
- api/scheduler_quick_info_detached_config.md - defines whether the event form will appear from the left/right side of the screen or near the selected event
}}


- **2 methods** 

{{links
- api/scheduler_hidequickinfo.md - hides the pop-up event form (if it's currently active)
- api/scheduler_showquickinfo.md - displays the pop-up event form for the specified event
}}

- **2 events**

{{links
- api/scheduler_onquickinfo_event.md - fires when the pop-up edit form appears
- api/scheduler_onafterquickinfo_event.md - fires after the pop-up event form is closed
}}