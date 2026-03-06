---
sidebar_label: formSection
title: "formSection method"
description: "gives access to the objects of lightbox's sections"
---

# formSection

### Description

@short: Gives access to the objects of lightbox's sections

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - the name of a lightbox section

### Returns
- ` config` - (object) - the section object (see the object members below)

### Example

~~~jsx
var time = scheduler.formSection('time');
var descr = scheduler.formSection('description');

//gets the value
var value = time.getValue();
var value1 = descr.getValue();

//sets the value
descr.setValue('abc'); //for sections that contain the only control
time.setValue(null,{start_date:new Date(2009,03,10),end_date:new Date(2012,03,10)}); 
//for multi-control sections:the 1st parameter is 'null', 2nd - a data object
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

The section object contains the following members:

## Properties

- **section** - (*object*) the configuration object of the section
  - **id** -  (*string*) the section's id
  - **name** - (*string*) the section's name. According to the name, the scheduler takes the label for the section from the **locale.labels** collection. For example, for the 'time' section , 
  the label will be taken as **scheduler.locale.labels.section_time**
  - **height** - (*number*) the section's height
  - **map_to** - (*string*) the name of a property mapped to the editor
- **control** - (*HTML collection*) a collection of controls used in the section  
## Methods

- **getValue()** - returns an object with the section's data
- **setValue()** - sets the value(s) for the section. As a parameter the method takes a value (or an object with values, if the section has several controls) that should be set
