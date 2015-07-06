onBeforeTooltip
=============

@short:fires before the tooltip is displayed for a data item (only with the 'tooltip' extension enabled)
	

@params:
- id	string	the id of a data item that the tooltip will be shown for

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example:
scheduler.attachEvent("onBeforeTooltip", function (id){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:
The event is blockable. Return *false* and the tooltip won't be shown.