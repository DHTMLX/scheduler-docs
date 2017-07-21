addEvent
=============
@short: 
	adds a new event

@params: 
- event	object	the event object

@returns:
- id	string	the event's id
@example: 
scheduler.addEvent({
	start_date: "16-06-2013 09:00",
	end_date:	"16-06-2013 12:00",
	text:	"Meeting",
	holder:	"John", // userdata
    room:	"5"     // userdata
});



@template:	api_method
@related:
	adding_events.md
@relatedapi:
	api/scheduler_api_date_config.md
    api/scheduler_addeventnow.md
    api/scheduler_deleteevent.md
@relatedsample:
	02_customization/08_validation.html
    02_customization/27_custom_event_box.html
@descr: 
{{note
The method invokes the api/scheduler_oneventadded_event.md or api/scheduler_oneventchanged_event.md event
}}

The event object can have the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>start_date</b></td>
			<td>(<i>Date, string</i>) the date, when the event is scheduled to begin.<br> If the property is specified as a string, the '%d-%m-%Y %H:%i' format should be used (to change the default format, use the api/scheduler_api_date_config.md option)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>end_date</b></td>
			<td>(<i>Date, string</i>) the date, when the event is scheduled  to be completed. <br> If the property is specified as a string, the '%d-%m-%Y %H:%i' format should be used (to change the default format, use the api/scheduler_api_date_config.md option)</td>		</tr>
        <tr>
			<td class="webixdoc_links0"><b>text</b></td>
			<td>(<i>string</i>)the event's text</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>id</b></td>
			<td>(<i>string</i>) the event's id. If not specified, the id for the event will be generated automatically</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>userdata</b></td>
			<td>(<i>hash</i>)  a collection of custom properties presented as 'key-value' pairs </td>
		</tr>
    </tbody>
</table>

<br>


