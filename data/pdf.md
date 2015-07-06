 Exporting Scheduler to PDF
===========================
Starting from version 4.1, dhtmlxScheduler provides a new approach for exporting the scheduler into the PDF format.

{{note
The article refers to exporting of dhtmlxScheduler 4.1+. If you use dhtmlxScheduler 4.0 or earlier versions, see details [here](pdf_v4.md).
}}


To export scheduler as a PDF document, do the following steps:

<ol>
	<li>Include the <a href="http://export.dhtmlx.com/scheduler/api.js" target="_blank">http://export.dhtmlx.com/scheduler/api.js</a> file on the page to enable the online export service: <br> <br>
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="http://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
</li>
	<li>Call the <a href="pdf.md#parametersoftheexportmethod">exportToPDF</a> method to export the scheduler: <br> <br>
~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/

<script>
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.init('scheduler_here',new Date(2009,5,30),"month");
	scheduler.load("data/events.xml");
</script>
~~~

</li>
</ol>
{{sample
04_export/06_online_export.html
}}


Parameters of the export method
----------------------------------------------------------
The **exportToPDF()** method takes as a parameter the object with 6 possible properties (all of the properties are optional):


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
    </tbody>
</table>
{{snippet
Calling the export method with optional properties
}}
~~~js
scheduler.exportToPDF({
	format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~


##Name of the output file

To set a custom name for the output file, use the **name** property in the <a href="pdf.md#parametersoftheexportmethods">exportToPDF</a>/<a href="pdf.md#parametersoftheexportmethods">exportToPNG</a> method:

~~~js
scheduler.exportToPDF({
	name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~


##Header/footer of the output file
To add the header/footer to the output PDF file, use the **header**/**footer** properties in the <a href="pdf.md#parametersoftheexportmethod">exportToPDF</a> method:

{{note
Note, you can use any HTML while specifying the parameters. While specifying images, remember that you need to set global paths as values of the "src" attribute
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

<ul>
	<li>through a link:
~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~
	</li>
	<li>or through the 'style' tag:
~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~
	</li>
</ul>
<br>

Note, the aforementioned solution works for the global HTTP reference. If you have CSS classes specified in an Intranet/local environment, you can embed all styles as in:

~~~js
scheduler.exportToPDF({
	header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~



@index:
- pdf_v4.md