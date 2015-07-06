toPDF
======================

@short: exports the  current view to a PDF document (can be used for printing)

@require:pdf
@params: 
- url	string	the path to the server-side PDF converter
* mode	string	the color map of the resulting PDF document

@example: 
scheduler.toPDF("./service/generate.php","color");



@template:	api_method
@relatedapi:
	api/scheduler_toPDFRange.md
@related:
	pdf.md
@relatedsample:
	03_extensions/11_pdf_plugin.html
    04_export/06_online_export.html
@descr: 

The second parameter (**mode**) of the method can take only one of the values from the predefined set:

- **'color'** - full-color printing (default)
- **'gray'** - prints in shades of black and white
- **'bw'** - prints in black and white only, no color options available
- **'custom'** - can be used to enable a custom color map. Requires php coding (<a href="pdf.md#configuringservice">details</a>)</a>
- **'fullcolor'** - actual background and text colors that are used while exporting
