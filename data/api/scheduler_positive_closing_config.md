positive_closing
=============
@short:defines the 'saving' behaviour for the case, when  the user edits the event's text directly in the event's box 
	

@type: boolean
@default:false
@views:day, week, units
@example:
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:
A click on the edit button in the select bar opens a form for editing the event's text. 
Any outside click closes the form and cancels the changes. To prevent this and save any changes made in the form, set the option to *true*.

<img src="api/positiveClosing_property.png" />

@apigroup: Events