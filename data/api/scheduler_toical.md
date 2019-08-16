toICal
=============
@short: converts scheduler's data to the ICal format

@params: 
* header	string	sets the value for the content's header field 

@returns: 
- string	string	a data string in the ICal format
@require:serialize
@example: 
var str = scheduler.toICal();
//or
var str = scheduler.toICal("My calendar");


@template:	api_method
@related:
	export.md
@relatedsample:
	04_export/01_serialize_data.html
@descr: 
{{note
Custom attributes are not supported.
}}
