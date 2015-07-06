
 Multi-page export to PDF 
==============

The library provides a special method that allows you to export into a PDF document several view pages at once. 


~~~js
scheduler.toPDFRange(from, to, view, path, scheme);

~~~
 


+ _**from**_ - (_Date object_) the date to start export events from
+ _**to**_ - (_Date object_) the date to end export events at
+ _**view**_ - (_string_) the view to apply export to
+ _**path**_ - (_url_) the path to the php file which generates a PDF file. See details in chapter ['Export to PDF. Configuring service'](pdf.md#server-side)
+ _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) specifies the colormap in use


1.  '_color_' - full-color printing, default value
2.  '_gray_' - prints in shades of black and white
3.  '_bw_' - uses only black and white colors
4.  '_custom_' - can be used to enable a custom colormap ( requires php coding, see details in chapter ['Export to PDF. Configuring service'](pdf.md#server-side) )
5.  '_fullcolor_' - actual background and text colors that are used while exporting

For example, to export pages of the 'week' view from 1st January, 2012 till 1st February, 2012, you may call the method as in:


~~~js
scheduler.toPDFRange(
	new Date(2012,0,1), 
    new Date(2012, 1,1),
    'week', 
    'generate.php', 
    'fullcolor'
);
~~~


