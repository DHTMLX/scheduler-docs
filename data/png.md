Export to PNG
===========================

Starting from version 4.1, dhtmlxScheduler provides an [online export service](png.md#defaultexporttopng)
that gives you the possibility to export the scheduler to the PNG format. 

{{note
The service is free, but the output PNG file will contain the library's watermark under the GPL license. In case you buy a license, the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
}}

Using Export Services
-----------------------

There are several export services available. You can install them on your computer and export Scheduler to PNG locally.

Note that export services are not included into the Scheduler package, 
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml) to learn the terms of using each of them.

Limits on request size
--------------------

There is a common API endpoint **https://export.dhtmlx.com/scheduler** which serves for export methods (*exportToPDF*, *exportToPNG*, etc.). **Max request size is 10 MB**.


Default Export to PNG
----------------------

To export the scheduler as a PNG image, do the following steps:

- To use the online export service, enable the <b>export_api</b> plugin via the api/scheduler_plugins.md method:

~~~js
scheduler.plugins({
  	export_api: true
});
~~~

{{note If you use the Scheduler version older than 7.0, you need to include the **https://export.dhtmlx.com/scheduler/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
}}

- Call the <a href="#parametersoftheexportmethods">exportToPNG</a> method to export the Scheduler: 

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/

~~~

{{sample
04_export/06_online_export.html
}}

Parameters of the export method
----------------------------------------------------------

The [exportToPNG()](api/scheduler_exporttopng.md) method takes as a parameter an object with a number of properties (all the properties are optional):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the name of the output file</td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>format</b></td>
			<td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) the format of the output PNG image/td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>orientation</b></td>
			<td>(<i>'portrait', 'landscape'</i>) sets the orientation of the output PNG image</td>
		</tr>        
        <tr>
			<td class="webixdoc_links0"><b>zoom</b></td>
			<td>(<i>number</i>) sets the zoom coefficient of the output PNG image</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) specifies the header that will be added to the output PNG image. Note, you can use any HTML here</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) specifies the footer that will be added to the output PNG image. Note, you can use any HTML here</td>
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
scheduler.exportToPNG({
	format:"A4",
	orientation:"portrait",
	zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


##Name of the output file

To set a custom name for the output file, use the **name** property in the 
[exportToPNG](png.md#parametersoftheexportmethod) method:

~~~js
scheduler.exportToPNG({
	name:"my_beautiful_scheduler.png"/*!*/
});
~~~



##Header/footer of the output file

To add the header/footer to the output PNG file, use the **header**/**footer** properties in the 
[exportToPNG](png.md#parametersoftheexportmethod) method:

{{note
Note, you can use any HTML while specifying the parameters. While specifying images, remember that you need to set global paths as values of the "src" attribute
}}

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~


##Custom style for the output file

To apply a custom style for the scheduler, provide the stylesheet with your custom CSS classes:

- through a link:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- or through the 'style' tag:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Note, the aforementioned solution works for the global HTTP reference. If you have CSS classes specified in an Intranet/local environment, you can embed all styles as in:

~~~js
scheduler.exportToPNG({
	header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~

