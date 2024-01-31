csp
=============

@short: defines internal implementation of the code of date formatting methods
	

@type: boolean,string
@example:
scheduler.config.csp = true;
...
scheduler.init("gantt_here");

@default: "auto"

@template:	api_config
@descr:
The runtime environment of some applications (for example, Salesforce Lightning) can often block the performing of the dhtmlxScheduler code.
The main reason for that is specifying the Content Security Policy in the app. 
The CSP can interpret inner high-performance execution of date formatting methods in Scheduler as insecure. 

The **csp** config allows preventing the scheduler code from being blocked via specifying the way of its implementation. 

There are three modes of internal implementation of the **scheduler.date.date_to_str** and **scheduler.date.str_to_date** methods of date formatting:

- By default, the config is set to the *auto* mode. 

~~~js
scheduler.config.csp = "auto";
~~~

In this mode, Scheduler attempts to use a high-performance code for the date formatting methods where it's possible. In case execution of the actually productive code is blocked by the application settings, a compatible code will be used.

- You can make the Scheduler code always compatible by setting the option to *true*.

~~~js
scheduler.config.csp = true;
~~~

In this mode the scheduler code will work in any case, but it may cause performance regression.

- You can also set the value of the config to *false* to make the Scheduler code high-performance only.

~~~js
scheduler.config.csp = false;
~~~

Note that the work of dhtmlxScheduler will stop if the code implementation is blocked by the application settings.

@changelog: added in v6.0

