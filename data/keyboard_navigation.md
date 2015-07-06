Keyboard navigation
===================================
The keyboard navigation functionality is included into the **ext/dhtmlxscheduler_key_nav.js** extension.

###Keyboard commands


Once the extension file is included on the page, you can use the following command to navigate through the scheduler:


<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Key 
		</th>
		<th>
			Description
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>Right arrow key</td>
        <td>scrolls to the next time period (next month, week, day, etc. depending on the currently active view)</td>
    </tr>
	<tr>
		<td>Left arrow key</td>
        <td>scrolls to the previous time period (last month, week, day, etc. depending on the currently active view)</td>
    </tr>
	<tr>
		<td>Ctrl + C</td>
        <td>copies the selected event to the clipboard</td>
    </tr>
	<tr>
		<td>Ctrl + V</td>
        <td>pastes the previously copied event from the clipboard to the scheduler</td>
    </tr>
	<tr>
		<td>Ctrl + X</td>
        <td>cuts the selected event</td>
    </tr>
    </tbody>
</table>

{{sample
	03_extensions/07_navigation_plugin.html
}}


###Related events

- api/scheduler_oneventcopied_event.md
- api/scheduler_oneventcut_event.md
- api/scheduler_oneventpasted_event.md
