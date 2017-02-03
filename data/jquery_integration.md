jQuery Integration
====================================
Starting from version 4.0 dhtmlxScheduler can be integrated with jQuery.

A standard scheduler used jQuery can be initialized as follows:

~~~js
$(function(){
	$(".myscheduler").dhx_scheduler({
        xml_date:"%Y-%m-%d %H:%i",
		date:new Date(2009,4,25),
		mode:"month"
	});
		
	scheduler.load("data/events.xml");
});
~~~

where:

- **".myscheduler"** - a jQuery compatible CSS selector of the container, in which scheduler will be created ( in case of the PRO version you can init scheduler in multiple containers at once ) 
- **dhx_scheduler()** method initializes an instance of dhtmlxScheduler. As a parameter the method takes a configuration object:
  - **date** - (*Date*) the initial date of the scheduler (by default, the current date)
  - **mode** - (*string*) the name of the initial view (by default, "week")
  - any other configuration parameters ( normally set through scheduler.config.xxxxx ) can be set in such a way
{{note
A scheduler, initialized through jQuery call, can use the same configuration and API that the standard scheduler uses
}}

{{sample
	10_integration/06_jquery.html
}}