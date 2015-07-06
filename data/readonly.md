Read-only Mode
========================================

In this part we want to consider read-only mode in the context of 4 situations:

1. [Read-only mode for the entire scheduler](readonly.md#readonlymodefortheentirescheduler);
2. [Read-only mode for the entire lightbox](readonly.md#readonlymodefortheentirelightbox);
3. [Read-only mode for a lightbox's section](readonly.md#readonlymodeforalighboxssection);
4. [Read-only mode for specific events](readonly.md#readonlymodeforspecificevents).

Read-only mode for the entire scheduler
---------------------------------------------------

To make the entire scheduler read-only, set the api/scheduler_readonly_config.md option to *true*.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"month");
~~~
Note, when the entire scheduler is non-editable, users can't open the lightbox.



Read-only mode for the entire lightbox
--------------------------------------------
To leave for users the possibility to open the lightbox, but to forbid any editing inside it, set the api/scheduler_readonly_form_config.md option to *true*:



~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"month");
~~~

{{note
The api/scheduler_readonly_config.md option is provided in the **dhtmlxscheduler_readonly.js** extension and to use it, include the extension file on the page.
}}

{{sample
	03_extensions/12_readonly_form.html
}}


Read-only mode for a lightbox's section
---------------------------------------------
To make a specific lightbox's section read-only, use the 'disabled' property of a DOM element of the related section object:

~~~js
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   var section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

{{note
Note, you refer to the section through its type and all sections that have this type will be read-only at once
}}

Read-only mode for specific events
------------------------------------------------
To make specific events read-only, add the property 'read-only' to them and set it to true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

{{note
The functionality is provided in the **dhtmlxscheduler_readonly.js** extension and to use it, include the extension file on the page.
}}

{{sample
	03_extensions/14_readonly_event.html
}}