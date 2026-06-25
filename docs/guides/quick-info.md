---
title: "Large Buttons for Easier Navigation"
sidebar_label: "Large Buttons for Easier Navigation"
---

# Large Buttons for Easier Navigation 

Starting from version 3.7, dhtmlxScheduler provides the new ["Quick Info" extension](guides/extensions-list.md#quick-info). The extension gives the possibility 
to replace standard sidebar buttons and simplified edit form with new (bigger and handier) ones.

## Activating the big-buttons scheduler

To activate the big-buttons scheduler, enable the ["Quick Info"](guides/extensions-list.md#quick-info) extension on the page:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2027,5,30),"day");
    ...
<script>
~~~

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


Once the extension is enabled, the scheduler automatically replaces standard buttons with large-size ones:

![quick_info_extension.png](/img/quick_info_extension.png)

## Configuring and customizing the big-buttons scheduler

To configure or customize the big-buttons scheduler, you have the following APIs:

- **3 templates** 

- [quick_info_content](api/template/quick_info_content.md) - specifies the content of the pop-up edit form
- [quick_info_date](api/template/quick_info_date.md) - specifies the date of the pop-up edit form
- [quick_info_title](api/template/quick_info_title.md) - specifies the title of the pop-up edit form


- **1 configuration option**

- [quick_info_detached](api/config/quick_info_detached.md) - defines whether the event form will appear from the left/right side of the screen or near the selected event

- **2 methods** 

- [hideQuickInfo](api/method/hidequickinfo.md) - hides the pop-up event form (if it's currently active)
- [showQuickInfo](api/method/showquickinfo.md) - displays the pop-up event form for the specified event
