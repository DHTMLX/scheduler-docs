Exporting Data to Excel, iCal
===========================================
Starting from version 4.2, dhtmlxScheduler provides  a possibility to export all data from the scheduler to  the Excel and iCal formats. 


Export to Excel
-------------------
To export scheduler's data to an Excel document, do the following steps:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/scheduler/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="http://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToExcel</b> method to export the scheduler's data: 
~~~html
<input value="Export to Excel" type="button" onclick='scheduler.exportToExcel()'>/*!*/

<script>
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.init('scheduler_here',new Date(2009,5,30),"month");
	scheduler.load("data/events.xml");
</script>
~~~

</li>
</ol>



####Parameters of the export method

The **exportToExcel()** method takes as a parameter the object with 2 possible properties (all of the properties are optional):

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
    </tbody>
</table>

{{snippet
Calling the export method with optional properties
}}
~~~js
scheduler.exportToExcel({
	{ name:"My document", columns:[
		{ id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ]}
});
~~~



Export to iCal
-------------------
To export scheduler's data to an iCal string, do the following steps:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/scheduler/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="http://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToIcal</b> method to export the scheduler's data: 
~~~html
<input value="Export to iCal" type="button" onclick='scheduler.exportToIСal()'>/*!*/

<script>
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.init('scheduler_here',new Date(2009,5,30),"month");
	scheduler.load("data/events.xml");
</script>
~~~

</li>
</ol>