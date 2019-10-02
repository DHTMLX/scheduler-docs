onMouseDown
=============


@short:fires when the user clicks on a scheduler's element that doesn't have the predefined 'onlick' handler
	

@params:
- className		string		the name of a css class defined for the clicked element
@example:


@template:	api_event
@descr:

Scheduler's elements that have the predefined 'onclick' handlers are listed in the table below.

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<caption class="caption">
		<strong>Table 1 </strong>
		Scheduler's elements with predefined 'onclick' handlers
	</caption>
	<thead>
	<tr>
		<th>
			Class name
		</th>
		<th>
			Element
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>dhx_cal_event_line</td>
		<td>Multi-day events in the Day, Week, Month, Units views and any event in the Timeline view</td>
	</tr>
	<tr>
		<td>dhx_cal_event_clear</td>
		<td>One-day events in the Month view</td>
	</tr>
	<tr>
		<td>dhx_event_move</td>
		<td>The header of the event's box used to drag  the event in the Day, Week, Units views</td>
	</tr>
	<tr>
		<td>dhx_wa_ev_body</td>
		<td>An event in the WeekAgenda view</td>
	</tr>
	<tr>
		<td>dhx_event_resize</td>
		<td>The lower part of the event's box used to resize the event in the Day, Week, Units views	</td>
	</tr>
    <tr>
		<td>dhx_scale_holder</td>
		<td>A column in the Day, Week, Units views</td>
	</tr>
	<tr>
		<td>dhx_scale_holder_now</td>
		<td>A highlighted column with the current date in the Day, Week, Units views</td>
	</tr>
	<tr>
		<td>dhx_month_body</td>
		<td>A cell without header in the Month view</td>
	</tr>
    <tr>
		<td>dhx_matrix_cell</td>
		<td>A cell in the Timeline view</td>
	</tr>
	<tr>
		<td>dhx_marked_timespan</td>
		<td>Marked (highlighted) cells</td>
	</tr>
	<tr>
		<td>dhx_time_block</td>
		<td>Blocked cells</td>
	</tr>
	</tbody>
</table>

@example:
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});