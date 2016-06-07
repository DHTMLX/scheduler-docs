delay_render
=============

@short: sets a timeout (in milliseconds) that wraps the api/scheduler_updateview.md and api/scheduler_setcurrentview.md calls  ( that cause re-drawing of the scheduler ) 
	

@type: int
@default:0

@example:
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");

@template:	api_config
@descr:

{{note
This option may help you to increase the performance.
}}

{{note
To be sure that some command will be called only after actual re-drawing happen, call it in a callback function of the api/scheduler_onviewchange_event.md event
}}


Many scheduler's configurations require re-drawing. And, in case you have a complex configuration, you may end up with separate functions, each of those specifies some configuration and refreshes the scheduler in order to apply it. Big number of re-drawings will quite affect the performance of your app.


Use the **delay_render** option, to  minimaze the number of re-drawings. 

<br>


For example, if you set <code>scheduler.config.delay_render = 30;</code>, any time the code invokes re-drawing, the scheduler will put the call into a queue and wait for 30 milliseconds.
If another 're-draw' call will be got during this time, the scheduler will reset the timeout and wait for another 30 ms. 
As a result, if the api/scheduler_updateview.md or/and api/scheduler_setcurrentview.md method is called multiple times within a short amount of time (which usually happens when re-drawing is triggered from different places of
the custom code) only the last call will be executed. 

@apigroup: Views
