Validation
====================

Validation allows you to control the data entered by the user in order to exclude the possibility of saving incorrect values. 
For example, with validation you can prevent creation of events without description.

Generally, to validate the data entered by the user, use the events provided by the [dhtmlxScheduler API](api/refs/scheduler_events.md) and catch the input data to process them in accordance with their correctness:

Client-side validation
--------------------------

The following events are mostly important and commonly used for data validation:

- api/scheduler_oneventsave_event.md - fires when the user clicks on the 'Save' button in the lightbox
- api/scheduler_onbeforeeventcreated_event.md - fires before a new event is added to the Scheduler
- api/scheduler_onbeforeeventchanged_event.md - fires  before an event is updated


The simplest validation can be achieved with the help of the api/scheduler_oneventsave_event.md event. The event is invoked when the user clicks the 'Save' button on the form. 
Returning *true* from the event will save the changes, returning *false* will cancel the further processing and leave the lightbox opened.

For example, to restrict saving of an event, if it doesn't have any description, or in case the text is too short, use the code like this:

~~~js
scheduler.attachEvent("onEventSave", function(id,ev){
	if (!ev.text) {
		dhtmlx.alert("Text must not be empty");
		return false;
	}
	if (ev.text.length < 20) {
		dhtmlx.alert("Text too small");
		return false;
	}
	return true;
});
~~~

{{sample
	02_customization/08_validation.html
}}


Server-side validation
-----------------------------

The solution above has a shortcoming - the event won't fire if the data in the lightbox has been changed through an inline editor or by dragging over the Scheduler.

To prove this and catch all changes made in the Scheduler (editing, creating, deleting etc.), use the [dataProcessor](server_integration.md) object or, to be precise, one of its events - 
[onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html). The event fires before sending data to the server and after any change, made in the Scheduler (not only in the lightbox).

~~~js
scheduler.init("scheduler_here");
scheduler.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(scheduler);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
	if (!data.text) {
        dhtmlx.message("The event's text can't be empty!");
        return false;
    }
    return true;
});
~~~
 
where: 

- **id** - (*string*) the event's id.
- **status** - (*'updated', 'inserted', deleted'*) the event's operation status.
- **data** - (*object*) the data to send.

Note, when the field fails validation, changes aren't sent to the server, but stay on the client and can be used for further processing.