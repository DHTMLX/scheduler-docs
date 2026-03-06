---
title: "Template"
sidebar_label: "Template"
---

# Template 

A container with some HTML content inside.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// sets the name of the section

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~

## Initialization

To add the Template control to the lightbox, follow these steps:
1. <b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. <b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. <b>Set the content of the control with the help of some event, e.g. the [onBeforeLightbox](api/event/onbeforelightbox.md) event:</b>
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## Properties

The following properties are mostly important and commonly set for the 'template' control (see the full list [here](api/config/lightbox.md)):

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
  </tbody>
</table>
