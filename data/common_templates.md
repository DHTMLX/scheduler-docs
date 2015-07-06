
Common Templates 
==============

##Lightbox

{{links
- api/scheduler_time_picker_template.md - the drop-down time selector in the lightbox
- api/scheduler_lightbox_header_template.md - the lightbox header
- api/scheduler_event_date_template.md - specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods
}}


<br>

<img src="api/lightbox_templates.png"/>

Touch support
----------------------------------------------
The library has a 'quick info' extension to provide [the touch support in the scheduler](touch_support.md).<br> The extension supplies 3 templates: 

<br>

{{links
- api/scheduler_quick_info_content_template.md - the content of the pop-up edit form
- api/scheduler_quick_info_date_template.md - the date of the pop-up edit form
- api/scheduler_quick_info_title_template.md - the title of the pop-up edit form
}}

<br>

<img src="api/touch_templates.png"/>

Tooltips
------------------------------------
You have the possibility to create tooltips over events, regardless of the type of a view. This can be used to display additional event information, without the need of 'opening' the event.

To take the possibility, include the tooltip extension file (**ext/dhtmlxScheduler_tooltip.js**) on the page. 

<br>

{{links
- api/scheduler_tooltip_date_format_template.md - the format of start and end dates used by the api/scheduler_tooltip_text_template.md template
- api/scheduler_tooltip_text_template.md - the text of tooltips
}}

<br>

<img src="api/tooltip_templates.png"/>

API templates
------------------------------------

{{links
- api/scheduler_api_date_template.md - the format for dates that are set by means of API methods. Used to parse incoming dates  
- api/scheduler_load_format_template.md - the format of requests in the dynamic loading mode  
- api/scheduler_xml_date_template.md - a string from an XML file is converted into a date object, in conformity with this template
- api/scheduler_xml_format_template.md - a date object is converted into a string, in conformity with this template. Used to send data back to the server
}}

