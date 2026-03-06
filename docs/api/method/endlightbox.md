---
sidebar_label: endLightbox
title: "endLightbox method"
description: "closes the lightbox"
---

# endLightbox

### Description

@short: Closes the lightbox

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - if set to <i>true</i>, the changes, made in the lightbox, will be saved before closing. <br> If - <i>false</i>, the changes will be cancelled.
- `box` - (optional) *HTMLElement* - the HTML container for the lightbox

### Example

~~~jsx
scheduler.endLightbox(false);
//or
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note

The method is used while creating a custom lightbox
 
:::
