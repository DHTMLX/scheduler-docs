Large Buttons for Easier Navigation 
============================================

Starting from version 3.7, dhtmlxScheduler provides the new ["Quick Info" extension](extensions_list.md#quickinfo). The extension gives the possibility 
to replace standard sidebar buttons and simplified edit form with new (bigger and handier) ones.

Activating the big-buttons scheduler
-------------------------------
To activate the big-buttons scheduler, enable the ["Quick Info"](extensions_list.md#quickinfo) extension on the page:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2009,5,30),"day");
    ...
<script>
~~~
{{sample
	03_extensions/29_quick_info.html
}}

Once the extension is enabled, the scheduler automatically replaces standard buttons with large-size ones:

![quick_info_extension.png](quick_info_extension.png)

Configuring and customizing the big-buttons scheduler
-------------------------------------------------------
To configure or customize the big-buttons scheduler, you have the following APIs:

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