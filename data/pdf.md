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

To export a scheduler as a PDF document, complete the following steps:

- To use the online export service, enable the <b>export_api</b> plugin via the api/scheduler_plugins.md method:

~~~js
scheduler.plugins({
  	export_api: true
});
~~~

{{note If you use the Scheduler version older than 7.0, you need to include the **https://export.dhtmlx.com/scheduler/api.js** file on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
}}

- Call the <a href="#parametersoftheexportmethod">exportToPDF</a> method to export Scheduler: 

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~

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

## Exporting HTML elements
 
While exporting the Scheduler to the PDF format, you should note that export of HTML elements is limited due to their possible insecurity. 

There are HTML elements which are not entirely allowed for export, such as `<canvas>`, `<svg>`, `<script>` and images with the *src* attribute that contains a Base64 image. However, there are safe ways of exporting images in the SVG and Base64 formats:

- you can use an `<img>` element with the *src* attribute that contains a URL of the image in the SVG format (suitable for the PNG and JPG formats, doesn't work for the Base64 format), e.g.:

~~~html
<img src=https://www.svgrepo.com/download/530597/hat.svg>
~~~

- you can use style elements, such as *background* or *background-image* and specify the `url` attribute with the link to the image or an image in the Base64 format as its value (suitable for the PNG/JPG/SVG formats)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


If you have an export module and you need to export HTML elements that are not supported by our online export server, you can submit a support request to get instructions on the changes you need to make in your module to remove restrictions. However, you should take into account that your server will be vulnerable to XSS-attacks.

@index:
- pdf_v4.md