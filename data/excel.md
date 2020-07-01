Export to Excel and iCal
=============================

Starting from version 4.2, dhtmlxScheduler provides  a possibility to export all data from the scheduler to  the Excel and iCal formats. 

Limits on request size
--------------------

There is a common API endpoint [https://export.dhtmlx.com/scheduler](https://export.dhtmlx.com/scheduler) which serves for export methods (*exportToPDF*, *exportToPNG*, etc.). **Max request size is 10 MB**.


Export to Excel
-------------------

To export scheduler's data to an Excel document, do the following steps:

<ol>
	<li>Include the <b>"https://export.dhtmlx.com/scheduler/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToExcel</b> method to export the scheduler's data: 
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
	scheduler.init("scheduler_here",new Date(2019,5,30),"month");
	scheduler.load("data/events");
</script>
~~~

</li>
</ol>


####Parameters of the export method

The **exportToExcel()** method takes as a parameter an object with several properties (all of the properties are optional):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the name of the output file with the extension '.xlsx' </td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>columns</b></td>
			<td>(<i>array</i>) configures columns of the output sheet
            	<ul>
                	<li>'id' - (string/number) the id of the event's  property that will be mapped to the column </li>
                    <li>'header' - (string) the column's header</li>
                    <li>'width' - (number) the column's width in pixels</li>
                </ul>
            </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is <strong>https://export.dhtmlx.com/scheduler</strong></td>
		</tr>
    </tbody>
</table>
<br>

{{snippet
Calling the export method with optional properties
}}
~~~js
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
		{ id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler"
});
~~~

#### Setting date format

To specify the format in which dates will be exported to an Excel file, use the **xml_format** template:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

{{editor	https://snippet.dhtmlx.com/5/6d3de8fa2		Setting date format}}

See the date format specification [here](settings_format.md).

Export to iCal
-------------------

To export scheduler's data to an iCal string, do the following steps:

- Include the <b>"https://export.dhtmlx.com/scheduler/api.js"</b> file on the page to enable the online export service:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- Call the <b>exportToICal</b> method to export the scheduler's data: 

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
	scheduler.init("scheduler_here",new Date(2019,5,30),"month");
	scheduler.load("data/events");
</script>
~~~


####Parameters of the export method

The **exportToICal()** method takes as a parameter an object with the following property (optional):

<table class="webixdoc_links">
	<tbody>
        <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is <strong>https://export.dhtmlx.com/scheduler</strong></td>
		</tr>
    </tbody>
</table>
<br>
{{snippet
Calling the export method with optional properties
}}
~~~js
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~
