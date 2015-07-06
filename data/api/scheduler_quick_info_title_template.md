quick_info_title
=============
@short:specifies the title of the pop-up edit form
	
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object
@require:quick_info


@example:
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@related:
	common_templates.md#touchsupport
    extensions_list.md#quickinfo
