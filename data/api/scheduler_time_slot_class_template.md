time_slot_class
=============

@short:specifies the CSS class of the background cell in the Day/Week views
	

@type:

@example:

scheduler.templates.time_slot_class=function(date){
	if(date.getHours() < 7 || date.getHours() > 18){
		return "custom_color";	
	}
	
};


@template:	api_template
@descr:

<img src="time_slot_template.png" style="border: 1px solid #E4E4E4"/>

The background of the Day/Week views consists of 30-minute blocks. The template can be used to add a custom CSS class to any background cell in the calendar.

@relatedapi:
api/scheduler_time_slot_text_template.md

@changelog: added in v7.0


