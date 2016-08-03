highlight_displayed_event
=============

@short:specifies whether events retrieved by the showEvent method should be highlighted while displaying
	

@type: boolean
@default:true

@example:
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2010,0,10),"week");

@template:	api_config
@relatedapi:
	api/scheduler_showevent.md
@descr:
The parameter is available from version 3.5 and used only in the context of the api/scheduler_showevent.md method.

@apigroup: Events

