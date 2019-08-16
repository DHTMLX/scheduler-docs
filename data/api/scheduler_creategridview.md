createGridView
=============

@short:creates the Grid view in the scheduler
	
@params:
- config	object	the configuration object of the Grid view

@example:
scheduler.createGridView({
	name:"grid",
	fields:[
		{id:"id",       label:'Book Title',	width:'*',	align:'right', 	sort:'str'},
		{id:"date",     label:'Author', 	width:100},
		{id:"text",     label:'Votes', 		width:200,	align:'left',	sort:'int'}
	],
	from:new  Date(2000, 00, 01),
	to:new Date(2013, 00, 01)
});

@template:	api_method

@require:grid_view
@views:grid
@relatedsample:
	03_extensions/27_grid_view.html
@related:
	grid_view.md
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The configuration object of the Grid view can have the following properties:
<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the view's id</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>fields</b></td>
			<td>(<i>array of objects</i>) configures columns of the grid.<br> Each object in the array specifies a single column and can take these properties:
            	<ul>
					<li><b>id</b> -   (<i>string</i>) the column's id. Must be set to the name of the related data property, you will load data from</li>
					<li><b>label</b> -   (<i>string</i>) the column's header</li>
                    <li><b>width</b> -   (<i>string</i>) the column's width. You can use '*' (asterisk) as the width value, to force a specific column to fill up the remaining width. If you use '*' for several columns,
                    they will share out the remaining width equally.</li>
					<li><b>align</b> -   (<i>right, center or left</i>) the horizontal text alignment</li>
                	<li><b>valign</b> -   (<i>top, middle or bottom</i>)  the vertical text alignment</li>
					<li><b>template</b> -   (<i>function</i>) the data template</li>
                	<li><b>sort</b> -   (<i>'int','date','str' or custom function</i>) enables sorting for the column (triggered by a single click on the header) and assigns one of predefined sorting types or the name of a sorting function</li>
					<li><b>css</b> -   (<i>string</i>) the name of a css class that will be applied to the column</li>
				</ul>
             </td>
        </tr>
        <tr>
			<td class="webixdoc_links0"><b>select</b></td>
			<td>(<i>boolean</i>)enables/disables selection in the grid (by default, selection is enabled)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>rowHeight</b></td>
			<td>(<i>number</i>) the height of rows in the grid</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>paging</b></td>
			<td>(<i>boolean</i>) enables/disables navigation with  buttons <img src="navigation_buttons.png"/>   in the grid <a href="grid_view.md">(details)</a></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>unit</b></td>
			<td>(<i>minute, hour, day, week, month, year</i>) the scrolling time unit. By default, 'month'</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>step</b></td>
			<td>(<i>number</i>) the number of units scrolled at a time. By default, 1.</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>from</b></td>
			<td>(<i>Date</i>) sets the left border of the allowable date range. Used to limit date range in the scheduler</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>to</b></td>
			<td>(<i>Date</i>) sets the right border of the allowable date range. Used to limit date range in the scheduler</td>
		</tr>
    </tbody>
</table>

@edition:pro