toPDFRange
=============

@short:exports several scheduler's views to a PDF document (can be used for printing)
	
@params:
- from	Date	the date to start export events from
- to	Date	the date to export events until
- view	string	the name of a view that the export should be applied to
- path	string	the path to the php file which generates a PDF file (<a href="pdf.md#configuringservice">details</a>)
- color	string	the color map in use



@example:
//exports pages of the 'week' view from the 1st January, 2012 
//till the 1st February, 2012
scheduler.toPDFRange(new Date(2012,0,1), new Date(2012, 1,1),'week', 
  'generate.php', 'fullcolor');

@relatedapi:
	api/scheduler_topdf.md
@template:	api_method
@descr:
{{note The method requires the [pdf](extensions_list.md#pdf) plugin to be enabled.}}

The **color** parameter of the method can take only one of the values from the predefined set:

- **'color'** - full-color printing (default)
- **'gray'** - prints in shades of black and white
- **'bw'** - uses only black and white colors
- **'custom'** - can be used to enable a custom color map. Requires php coding (<a href="pdf.md#configuringservice">details</a>)</a>
- **'fullcolor'** - actual background and text colors that are used while exporting

