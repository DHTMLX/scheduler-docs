exportToPDF
=============


@short: exports a Scheduler into the PDF format
	

@params:
- export		object		an object with export settings (see the details)




@example:
scheduler.exportToPDF();
 
//or
scheduler.exportToPDF({
  name: "myscheduler.pdf"
});

scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});

@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to include it on the page:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Read the details in the pdf.md article.
}}

The **exportToPDF()** method takes as a parameter an object with a number of properties (all of the properties are optional):


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

@related:
pdf.md
