---
title: "Data Serialization to XML, JSON, iCal"
sidebar_label: "Data Serialization to XML, JSON, iCal"
---

# Data Serialization to XML, JSON, iCal 

## Making preparations 

To activate such functionality, enable the **serialize** extension.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


## Export to XML 

To serialize scheduler data to an XML string, use the [toXML](api/method/toxml.md) method:


~~~js
const xml = scheduler.toXML(); //xml string

~~~


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export to JSON 

To serialize scheduler data to a JSON string, use the [toJSON](api/method/tojson.md) method: 


~~~js
const json_string = scheduler.toJSON(); //json string
~~~


:::note
Note, the method returns a JSON string, not object. If you need to get a JSON object - use the [getEvents](api/method/getevents.md) method.
:::


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export to iCal 

To serialize scheduler data to an ICal string, use the [toICal](api/method/toical.md) method: 


~~~js
const ical_string = scheduler.toICal(); //ical string
~~~


Also, there is an [external script for iCal import-export operations](guides/ical-export-import.md)


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Attributes in serialization

:::note
The following technique is not applicable to the iCal format.
:::

By default export will include only standard attributes(properties):

1. id
2. text
3. start_date (*format of serialization is defined by the [date_format](api/config/date_format.md) property*)
4. end_date

  
If you need to include some custom attributes, you can redefine the **data_attributes** method. In the simplest case it will look as in:


~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~


Basically, the method defines a list of attribute names. 


But you can define the formatting function, which describes how attribute data needs to be processed before serialization.

It can be useful for dates that need converting before being placed in XML

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## Serializing recurring events

:::note
Below technique is not applicable for the iCal format.
:::

If you are using the "recurring" extension, you need to define extra attributes, which are used by recurring events:

~~~js
scheduler.data_attributes = function(){
    const empty = function(a){ return a||""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~


## Saving data in an XML file

Serialization allows you to implement a simple routine of data saving, which doesn't require DB - data will be stored in an XML file. 

- First of all, enable the **serialize** extension:

~~~js
scheduler.plugins({
    serialize: true
});
~~~


- Then, place a hidden form for data saving on the page:


~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~


- Place the "Save" button on the page


~~~html
<input type="button" name="save" value="save" onclick="save()" >

~~~


~~~js
function save(){
    let form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~


- On server side, write the data in an existent file. xml_writer.php could be as follows:


~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~


the empty data.xml is:


~~~xml
<data></data>
~~~


That's all, now scheduler can be loaded from data.xml, pressing "save" button will serialize the current state of the scheduler to xml and save back to the file. 

So, on next loading the scheduler will load events that have been saved previously. 


## Troubleshooting 

If during data saving, you face unwanted data escaping (in the saved data), make sure that "magic_quotes" is disabled in php configuration. 
