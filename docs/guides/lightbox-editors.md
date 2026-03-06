---
title: "Lightbox Controls"
sidebar_label: "Lightbox Controls"
---

# Lightbox Controls

Lightbox is an edit form used to alter the event's details. The default lightbox is presented in the image below.

![lightbox](/img/lightbox.png)

## Lightbox Structure

### Sections
The structure of the lightbox is specified by the **sections** property of the [lightbox](api/config/lightbox.md) object:

~~~js
//default lightbox definition
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Each element of the **sections**'s array is an object that specifies an individual section in the lightbox ([available section properties](api/config/lightbox.md)).


### Sections controls
Each section of the lightbox is based on some control. The following types of controls are available for use in the lightbox:

- [Textarea](guides/textarea.md) - a multiline text field
- [Time and Date](guides/time.md) - a pair of date selectors for setting some date period
- [Select](guides/select.md) - a single-select drop-down list box
- [Template](guides/template.md) - a container with some HTML content inside
- [Multiselect](guides/multiselect.md) - a set of check boxes
- [Checkbox](guides/checkbox.md) - a two-state check box
- [Radio](guides/radio.md) - a set of radio buttons
- [Combo](guides/combo.md) - a combo box presented by the DHTMLX Combo component

:::note
Remember, whatever combination of editors you use, the 'time' editor must be the last one in the lightbox.
:::

~~~js
{name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
    {key:"", label:"Do not repeat"},
    {key:"day", label:"Each day"},
    {key:"week", label:"Each week"},
    {key:"month", label:"Each month"}
]}
~~~
