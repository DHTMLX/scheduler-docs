Export to PDF
===========================

*The article refers to exporting of dhtmlxScheduler 4.1+. If you use dhtmlxScheduler 4.0 or earlier versions, see details [here](pdf_v4.md).*


Starting from version 4.1, dhtmlxScheduler provides a new approach for exporting the scheduler into the PDF format - 
an [online export service](pdf.md#defaultexporttopdf).


{{note
The service is free, but the output PDF file will contain the library's watermark under the GPL license. In case you buy a license, the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
}}

Using Export Services
-----------------------

There are several export services available. You can install them on your computer and export Scheduler to PDF locally.

Note that export services are not included into the Scheduler package, 
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml) to learn the terms of using each of them.


Limits on request size
--------------------

There is a common API endpoint <b>*https://export.dhtmlx.com/scheduler*</b> which serves for export methods (*exportToPDF*, *exportToPNG*, etc.). **Max request size is 10 MB**.


Default Export to PDF
----------------------

To export scheduler as a PDF document, do the following steps:

<ol>
	<li>Include the <a href="https://export.dhtmlx.com/scheduler/api.js" target="_blank">https://export.dhtmlx.com/scheduler/api.js</a> file on the page to enable the online export service: <br> <br>
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
</li>
	<li>Call the <a href="pdf.md#parametersoftheexportmethod">exportToPDF</a> method to export the scheduler: <br> <br>
~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/

<script>
	scheduler.init('scheduler_here',new Date(2019,5,30),"month");
	scheduler.load("data/events");
</script>
~~~

</li>
</ol>
{{sample
04_export/06_online_export.html
}}


Parameters of the export method
----------------------------------------------------------

The [exportToPDF()](api/scheduler_exporttopdf.md) method takes as a parameter an object with a number of properties (all of the properties are optional):


<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the name of the output file</td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>format</b></td>
			<td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) the format of the output PDF image</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>orientation</b></td>
			<td>(<i>'portrait', 'landscape'</i>) sets the orientation of the output PDF image</td>
		</tr>        
        <tr>
			<td class="webixdoc_links0"><b>zoom</b></td>
			<td>(<i>number</i>) sets the zoom coefficient of the output PDF image</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) specifies the header that will be added to the output PDF image. Note, you can use any HTML here</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) specifies the footer that will be added to the output PDF image. Note, you can use any HTML here</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is <strong>https://export.dhtmlx.com/scheduler</strong></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) an object with additional settings. The object can contain the following attributes:
			<ul>
					<li><b>format</b> - (<i>string</i>) the format of the output file: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li>
					<li><b>landscape</b> - (<i>boolean</i>) the portrait or landscape orientation of the output file. The attribute works only when the "format" attribute is specified.</li>
					<li><b>width</b> - (<i>string|number|"content"</i>) the width of the output page. The attribute is used when exporting multiple pages. </li>
					<li><b>height</b> - (<i>string|number|"content"</i>) the height of the output page. The attribute is used when exporting multiple pages.</li>
				</ul>
			</td>
		</tr>
    </tbody>
</table>
<br>

{{snippet
Calling the export method with optional properties
}}
~~~js
scheduler.exportToPDF({
	name:"myscheduler.pdf",
	format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


##Name of the output file

To set a custom name for the output file, use the **name** property in the in the parameter of the [exportToPDF](pdf.md#parametersoftheexportmethod) method:

~~~js
scheduler.exportToPDF({
	name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~


##Header/footer of the output file

To add a header/footer to the output PDF file, use the **header**/**footer** properties in the parameter of the [exportToPDF](pdf.md#parametersoftheexportmethod) method:

{{note
Note, you can use any HTML while specifying the parameters. While specifying images, remember that you need to set global paths as values of the "src" attribute.
}}

~~~js
scheduler.exportToPDF({
	name:"myscheduler.pdf",
	header:"<h1>My company</h1>",/*!*/
	footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


##Custom style for the output file

To apply a custom style for the scheduler, provide the stylesheet with your custom CSS classes:

- through a link:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- or through the 'style' tag:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~


Note, the aforementioned solution works for the global HTTP reference. If you have CSS classes specified in an Intranet/local environment, you can embed all styles as in:

~~~js
scheduler.exportToPDF({
	header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~



@index:
- pdf_v4.md