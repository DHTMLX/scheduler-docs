---
sidebar_label: lightbox
title: "lightbox config"
description: "specifies the lightbox object"
---

# lightbox

### Description

@short: Specifies the lightbox object

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections=[    
    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
    { name:"location",    height:43, type:"textarea", map_to:"event_location"},
    { name:"time",           height:72, type:"time",     map_to:"auto"}    
];
...            
scheduler.init('scheduler_here',new Date(2027,2,1),"week");
~~~

### Related samples
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

The lightbox object has 1 property:

- **sections** - (*array*) specifies lightbox's sections 

~~~js
//default definition 
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
~~~

Each object in the **sections** array can have the following properties:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) the section's name (according to this name, the scheduler will take the section's label from <i>locale.labels</i> collection). For example for the <b>'time'</b> section, the scheduler will take the label stored as <b>scheduler.locale.labels.section_time</b>.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) the section's height</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' or string</i>) the name of a data property that will be mapped to the section (see details below)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) the type of the section's control (editor)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) sets the order of date-time controls in the 'Time Period' section</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) if set to <i>true</i>, the section will take the focus on opening the lightbox</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) the default value of the section's control</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) specifies the 'onChange' event handler function for the section's control (<b>for the 'select' control only</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) defines select options of the control (<b>for 'select', 'multiselect, 'radio', 'combo' controls</b>).<br> Each object in the array specifies a single option and takes these properties:<ul><li><b>key</b> - (<i>string</i>) the option's id. This attribute is compared with the event's data property to assign select options to events</li><li><b>label</b> - (<i>string</i>) the option's label</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) specifies whether radio buttons should be placed vertically(<i>true</i>) or horizontally (<i>false</i>) (<b>for the 'select' control only</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) the value of the checkbox in the checked state. Optional. By default, <i>true</i> (<b>for the 'checkbox' control only</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) the value of the checkbox in the unchecked state. Optional. By default, <i>false</i> (<b>for the 'checkbox' control only</b>)</td>
  </tr>
  </tbody>
</table>

## Meaning of 'map_to:'auto'

The 'map_to' property can take the 'auto' value. The 'auto' value relates to the following:

- The control won't return any value and will directly change the value of the related event's properties according to the 'set_value()' method ([Custom Lightbox Control](guides/custom-lightbox-editor.md)). 
- Generally, the 'auto' value is used for complex controls that work with multiple properties of an event

### Related Guides
- [Fully Custom Lightbox](guides/custom-details-form.md)
