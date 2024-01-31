details_on_create
=============

@short:'says' to use the extended form while creating new events by drag or double click
	

@type: boolean
@default:true
@views:day, week,units
@example:
scheduler.config.details_on_create=true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");

@template:	api_config
@descr:

@relatedsample:
	02_customization/05_custom_editor.html
    02_customization/12_full_day_event.html

@apigroup: Events

@changelog:
Default value changed to `true` in v7.0