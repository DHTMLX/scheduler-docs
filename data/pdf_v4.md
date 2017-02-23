Export to PDF (version 4.0)
============================

## Installation 
The PHP version of the package: [http://dhtmlx.com/x/download/regular/scheduler-pdf-php.zip](http://dhtmlx.com/x/download/regular/scheduler-pdf-php.zip)
  
  
The Java version of the package: [http://dhtmlx.com/x/download/regular/scheduler-pdf-java.zip](http://dhtmlx.com/x/download/regular/scheduler-pdf-java.zip)
  
  
The .NET version of the package: [https://github.com/DHTMLX/scheduler-export-net](https://github.com/DHTMLX/scheduler-export-net)

{{sample
04_export/05_standalone_export.html
}}

## Necessary includes 

On the scheduler page, include one more extension:

~~~js
<script src="codebase/ext/dhtmlxscheduler_pdf.js"></script>

~~~


In older versions of the scheduler this file can be missed in the codebase folder. In such a case, use the _dhtmlxscheduler_pdf.js_ from the latest package.


## Triggering the export 

To export scheduler data to PDF, you just need to add on the page a button, which will call the **toPDF()** method. The parameter of the **toPDF()** method is the URL of the script, which has been installed previously:


~~~js
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')" 
style="right:300px; width:80px; position:absolute; top:1px;">

~~~




## Configuring service 
To configure the export options, you need to deal with both client- and server-sides.

### Client-side 
As mentioned above, for export activation you should use the method **toPDF()**:

~~~js
scheduler.toPDF(path, color, header, footer);

~~~

**Parameters:**


- _**path**_ - (_url_) the path to the php file which generates PDF-file. See details [below](pdf.md#serverside).
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) specifies colormap.
	* '_color_' - full-color printing, default value.
	* '_gray_' - prints in shades of black and white.
	* '_bw_' - uses only black and white colors.
	* '_custom_' - can be used to enable a custom colormap ( requires php coding, see [below](pdf.md#serverside) ). 
	* '_fullcolor_' - actual background and text colors that are used while exporting.
- _**header**_ - (_boolean_, optional) defines whether a header will be added to the page. By default, _false_. See details [below](pdf.md#headerandfooter).
- _**footer**_ - (_boolean_, optional) defines whether a footer will be added to the page. By default, _false_.
  
   See details [below](pdf.md#headerandfooter).

So, to your HTML page add a code line that will call **toPDF()** method with the appropriate number of the parameters. For example, it may look like:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');

~~~


## Server-side
In the code snippet above _generate.php_ is a php file that defines export options.
  
  
The simplest sample of the file is:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);

~~~


But before executing the **printScheduler()** method, you can apply some custom configuration options:

**Size of elements:**

~~~php
// the height of the header of the day container in the month mode
$scPDF->monthDayHeaderHeight = 6;
 // the height of the header in the month mode
$scPDF->monthHeaderHeight = 8;
 // the height of the month name container in the year mode
$scPDF->yearMonthHeaderHeight = 8;
 // height of the row in the agenda mode
$scPDF->agendaRowHeight = 6;
 // the height of the header in the day and week mode
$scPDF->dayTopHeight = 6;
 // the width of the left scale in the day and week mode
$scPDF->dayLeftWidth = 16;

~~~


**Font size:**

~~~php
 // font size settings
$scPDF->monthHeaderFontSize = 9;
$scPDF->monthDayHeaderFontSize = 8;
$scPDF->monthEventFontSize = 7;
$scPDF->yearHeaderFontSize = 8;
$scPDF->yearFontSize = 8;
$scPDF->agendaFontSize = 8;
$scPDF->dayHeaderFontSize = 7;
$scPDF->dayScaleFontSize = 8;
$scPDF->dayEventHeaderFontSize = 7;
$scPDF->dayEventBodyFontSize = 7;
$scPDF->todayFontSize = 11;

~~~


**Custom colors** ( make sure, you use the 'custom' value as the name of colormap on client-side ):

~~~php
$scPDF->lineColor = '586A7E';
$scPDF->bgColor = 'C2D5FC';
$scPDF->dayHeaderColor = 'EBEFF4';
$scPDF->dayBodyColor = 'FFFFFF';
$scPDF->dayHeaderColorInactive = 'E2E3E6';
$scPDF->dayBodyColorInactive = 'ECECEC';
$scPDF->headerTextColor = '2F3A48';
$scPDF->textColor = '2F3A48';
$scPDF->eventTextColor = '887A2E';
$scPDF->eventBorderColor = 'B7A543';
$scPDF->eventColor = 'FFE763';
$scPDF->todayTextColor = '000000';
$scPDF->scaleColorOne = 'FCFEFC';
$scPDF->scaleColorTwo = 'DCE6F4';
$scPDF->yearDayColor = 'EBEFF4';
$scPDF->yearDayColorInactive = 'd6d6d6';

~~~

**Headers and footers:**

~~~php
// the height of the header
$scPDF->headerImgHeight = 40;
// the height of the footer
$scPDF->footerImgHeight = 40;
// the path to the header image
$scPDF->headerImg = './header.png';
// the path to the footer image
$scPDF->footerImg = './footer.png';
~~~


## Header and Footer 
It's possible to define custom header and footer for each page.
  
   
To achieve that, do the following steps: 


+ create images with the names  "_header.png_" and "_footer.png_".
+ copy those images to the same folder where _generate.php_ resides. 
+ on client-side, change thr code's call as:
  
   
  
   
~~~js
scheduler.toPDF(url, "color", true, true);

~~~


As a result, you will have "_header.png_" and "_footer.png_" images as the header and footer on all pages in the generated PDF file. 

## Error reporting 

If output of PDF file is failed, there must be the file named as "error_report_xxxx.xml". Please, send this file with any bug-reports.

If output doesn't fail, but still has some problems, you can edit _generate.php_ and change

~~~php
$debug = false;

~~~

as

~~~php
$debug = true;

~~~


As a result, there will be a new file saved, with the name "debug_xxxxx.xml". Please, send it with the related error report. 


@index:
- pdf_multi.md