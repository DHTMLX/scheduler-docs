addEventNow
=============


@short: 
	adds a new event and opens the lightbox to confirm

@params: 
- event	object	the event object

@returns:
- id	string	the event's id

@example: 
scheduler.addEventNow();
//or
scheduler.addEventNow({
	start_date: new Date(2013,0,10,8,30),
	end_date: 	new Date(2013,0,10,10,30),
	text:	"Meeting",
	holder:	"John", //userdata
    room:	"5"     //userdata
});



@template:	api_method
@related:
	adding_events.md
@relatedapi:
	api/scheduler_api_date_config.md
    api/scheduler_time_step_config.md
    api/scheduler_addevent.md
@relatedsample:
	02_customization/28_lightbox_default_value.html
    09_api/06_hightlight_and_single_click_create.html
@descr: 

The event object can have the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>start_date</b></td>
			<td>(<i>Date, string</i>) the date, when the event is scheduled to begin. By default, the current date. <br> <br> If the property is specified as a string, the '%d-%m-%Y %H:%i' format should be used 
                 (to change the default format, use the api/scheduler_api_date_config.md option)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>end_date</b></td>
			<td>(<i>Date, string</i>) the date, when the event is scheduled to be completed. By default, the current date + api/scheduler_time_step_config.md value. <br> <br> If the property is specified as a string, 
                  the '%d-%m-%Y %H:%i' format should be used (to change the default format, use the api/scheduler_api_date_config.md option)</td>		</tr>
        <tr>
			<td class="webixdoc_links0"><b>text</b></td>
			<td>(<i>string</i>) the event's text</td>
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

There is also a possibility to pass the event object to the method as a list of string values:

~~~js
scheduler.addEvent("16-06-2013 09:00","16-06-2013 14:00","Summit", {holder:"Alex"})
~~~
