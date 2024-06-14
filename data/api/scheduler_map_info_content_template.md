map_info_content
=============


@params:

- event	object	the event object

@short:
	specifies the content of the info window in the Map View

@type:

@example:

scheduler.templates.map_info_content = function(event){
	const formatDate = scheduler.templates.tooltip_date_format;
	return `<div><b>Event's text:</b> ${event.text}
		<div><b>Location:</b> ${event.event_location}</div>
		<div><b>Starts:</b> ${formatDate(event.start_date)}</div>
		<div><b>Ends:</b> ${formatDate(event.end_date)}</div>
	</div>`;
};

@template:	api_template
@descr:
This template defines the content of the [InfoWindow](https://developers.google.com/maps/documentation/javascript/infowindows) popup that is displayed when the user clicks an event marker inside the Map View.

This template replaces the `scheduler.templates.marker_text` and `scheduler.templates.marker_date` templates that were removed from the Scheduler in v7.1.

@related:
	map_view.md

@changelog:
Added in v7.1