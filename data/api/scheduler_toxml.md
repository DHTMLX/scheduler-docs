toXML
=============
@short: converts scheduler's data into the XML format

@returns:
- string	string	a data string in the XML format
	

@example: 
var str = scheduler.toXML();



@template:	api_method
@relatedsample:
	04_export/01_serialize_data.html
   
@descr: 
{{note The method requires the [serialize](extensions_list.md#serialize) plugin to be enabled.}}

- Custom attributes [can be configured](export.md) if necessary.
- The method can be used with recurring events.

