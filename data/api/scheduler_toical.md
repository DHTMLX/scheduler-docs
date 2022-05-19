toICal
=============
@short: converts scheduler's data to the ICal format

@params: 
* header	string	sets the value for the content's header field 

@returns: 
- string	string	a data string in the ICal format

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
{{note The method requires the [serialize](extensions_list.md#serialize) plugin to be enabled.}}

{{note
Custom attributes are not supported.
}}
