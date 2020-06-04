{timelineName}_row_class
=============

@short:specifies the CSS class that will be applied to a row of the Timeline view
	

@params:

- section	object	the section object
- timeline  object  the timeline object


@example:
scheduler.templates.timeline_row_class = function(section, timeline){
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:

The default value of the template is:

~~~js
scheduler.templates.{timelineName}_row_class = function(section, timeline){
	if(timeline.folder_events_available && section.children){
		return "folder";
	}
	return "";
};
~~~
	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md

@relatedapi:
api/scheduler_{timelinename}_cell_class_template.md
api/scheduler_{timelinename}_cell_value_template.md

@edition:pro

@changelog: added in v5.3.9