---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
const alert_opts = [
    { key: 1, label: 'None' },
    { key: 2, label: 'On start date' },
    { key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Initialization

To add the Select control to the lightbox, follow these steps:

1. <b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. <b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  


[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Properties

The following properties are mostly important and commonly set for the 'select' control (see the full list [here](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) section's name</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) section's height</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) the type of the section's control</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) defines select options of the control (<b>for 'select', 'multiselect', 'radio', 'combo' controls</b>). Each object in the array specifies a single option and takes these properties: <ul> <li><b>key</b> - (<i>string</i>) the option's id. This attribute is compared with the event's data property to assign options to events</li> <li><b>label</b> - (<i>string</i>) the option's label</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) specifies the 'onchange' event handler function for the section's control [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## Populating the control with data

Generally, to set values for the Select control you should use the [options](api/config/lightbox.md) parameter:

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'None'},
            { key: 2, label: 'On start date'},
            { key: 3, label: '1 day before'}
    ]},
    ...
];
~~~

Items in the [options](api/config/lightbox.md) parameter must have 2 mandatory properties:

- **key** - the option's id
- **label** - the option's label

## Changing options dynamically

To populate the control from the server, set the [options](api/config/lightbox.md) option
to the value returned by the [serverList](api/method/serverlist.md) method:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~

:::note
The details on the **serverList** method are given in the [related article](api/method/serverlist.md).
:::

The data response for the [load](api/method/load.md) method should contain a collection with the server list name specified in JSON
[of the following format](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":"2"
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":"1","label":"Interview"},/*!*/
         {"value":"2","label":"Performance review"},/*!*/
         {"value":"3","label":"Request"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~


The [parse](api/method/parse.md) method can be also used if you need to load options after initialization of the scheduler.

In case you need to update the specified options of the control with new ones, you can use the [updateCollection](api/method/updatecollection.md) method:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

Check the details in the [scheduler.serverList](api/method/serverlist.md) article.
