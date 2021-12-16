getState
=============
@short: 
	gets the current state of the scheduler 

@returns:
-state	object	the state object
@example: 
var mode = scheduler.getState().mode;
if(mode == "day"){
	// custom logic here
}
else {
	// custom logic here
}



@template:	api_method
@relatedsample:
	02_customization/16_custom_form.html
    06_timeline/09_drag_duration.html

@descr: 
The state object reflects inner UI configuration of the scheduler and has the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>mode</b></td>
			<td>(<i>string</i>) the currently opened view</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>date</b></td>
			<td>(<i>Date</i>) the active date</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>min_date</b></td>
			<td>(<i>Date</i>) the date that events are displayed in the currently opened view from </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>max_date</b></td>
			<td>(<i>Date</i>) the date that events are displayed in the currently opened view till </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>editor_id</b></td>
			<td>(<i>string</i>) the id of an event that is currently being edited in the inline editor. 'Undefined' or 'null', if no events are being  edited in the inline editor.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>lightbox_id</b></td>
			<td>(<i>string</i>)  the id of an event that is currently opened in the lightbox. 'Undefined' or 'null', if no events are opened in the lightbox.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>new_event</b></td>
			<td>(<i>Date</i>)  a flag that indicates whether a new event is being creating at the current moment. Current date, if a new event is being created in the scheduler. 'Undefined' or 'null', if no new events are being created in the scheduler.</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>select_id</b></td>
			<td>(<i>string</i>)  the id of the currently selected event. 'Undefined' or 'null', if no events are selected in the scheduler.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>expanded</b></td>
			<td>(<i>boolean</i>) gets <i>true</i>, when the scheduler is expanded. 'Undefined' or 'null', if the scheduler is in its normal size or the <a href="extensions_list.md#expand">expand</a> extension isn't enabled in the app.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>drag_id</b></td>
			<td>(<i>string</i>) the id of an event that the user is currently dragging in the scheduler. 'Undefined' or 'null', if no tasks are being dragged in the scheduler.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>drag_mode</b></td>
			<td>(<i>'move','resize','create', 'new-size'</i>) the drag mode. 'Underfined' or 'null', if no events are being dragged in the scheduler.</td>
		</tr>
    </tbody>
</table>

{{note
Note, scheduler's behavior can not be changed by modifying this object.
}}
