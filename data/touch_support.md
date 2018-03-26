Touch Support in dhtmlxScheduler 
==============

dhtmlxScheduler provides support for touch devices, such as:

- iOS devices (iPad, iPhone, iPod);
- Windows 8-based tablets and touch screen monitors;
- Android-based devices.

_Technically, the scheduler will work on the latest smartphones as well, but due to the lack of screen space it still isn't a good idea._

**Important tips!**


+ Touch support is enabled by default and provided in all modes of the scheduler.
+ If your app is intended to be used on the touch devices, we strongly recommend to use the 'dhx_terrace' skin, as it provides reasonably big and easy-to-touch buttons.
+ We recommend to add the meta tag on the page. It'll protect you from zooming on a touch device.
  
    
~~~js
<meta name="viewport" content="width=device-width, initial-scale=1">

~~~

{{note
To start using the extension, include the **ext/dhtmlxscheduler_quick_info.js** file on the page.
}}

## Touch configuration options 

{{links
- api/scheduler_touch_config.md - enables/disables the touch support in the scheduler
- api/scheduler_touch_drag_config.md - defines the time period in milliseconds that is used to differentiate the long touch gesture from the scroll gesture
- api/scheduler_touch_tip_config.md - enables/disables prompting messages in the right top corner of the screen
}}

##Touch gestures in the scheduler


- **Double tap** -  works the same as double click in the normal scheduler (triggers event edition or creation);
- **Long tap and drag**  - moves or creates events;
- **Swipe** - switches view to the next|prev time span.

##'Quick info' extension


Specially for providing touch functionality, the library is extended with the ["Quick Info" extension](extensions_list.md#quickinfo).

The extension allows you to replace the standard sidebar buttons and the simplified edit form 
(which are quite small and hard-to-target on touch devices) with new ones, bigger and handier.

To activate the big-buttons scheduler, include the ["Quick Info"](extensions_list.md#quickinfo) extension file on the page:

~~~js
<script src="../../codebase/ext/dhtmlxscheduler_quick_info.js"></script>
<script>
      scheduler.init('scheduler_here',new Date(2009,5,30),"day");
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