format_date
=============

@short:
	сonverts date object to a date string. Used to send data back to the server

@params:
- date		Date		the date which needs formatting

@example:
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};

@template:	api_template

@returns:
- text    string     a text representation of the date

@descr: Check settings_format.md.

@related:
	loading_data.md
    date_formats.md
    server_integration.md
    settings_format.md


