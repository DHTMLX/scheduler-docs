time_slot_text
=============


@short:specifies the content of the background cell in the Day/Week views
	

@type:

@example:

scheduler.templates.time_slot_text=function(date){
	if(date.getHours() >= 12 && date.getHours() < 13){
		return "Lunch break";	
	}			
};

@template:	api_template
@descr:


<img src="time_slot_template.png" style="border: 1px solid #E4E4E4"/>


The background of the Day/Week views consists of 30-minute blocks. The template can be used to define HTML content of every such block in the calendar.

@relatedapi:
api/scheduler_time_slot_class_template.md

@changelog: added in v7.0
