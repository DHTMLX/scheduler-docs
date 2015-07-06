onBeforeSectionRender
=============

@short:fires before a single Timeline section was configured, but not rendered yet (the Timeline view only)
	

@params:
- mode	string	the timeline mode: 'cell', 'bar' or 'tree'
- section	object	the section object with the <i>'key'</i> and <i>'label'</i> properties specified in the 'y_unit' array <br>of the Timeline configuration object  (e.g. {key:1, label:"James Smith"})
- timeline	object 	the Timeline configuration object

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example:
scheduler.attachEvent("onBeforeSectionRender", function (mode, section, timeline){
    //any custom logic here
	return true;
});


@template:	api_event
@descr:
The event can be used to customize the timeline sections. 

@edition:pro