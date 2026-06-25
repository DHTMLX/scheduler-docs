---
sidebar_label: endLightbox
title: "endLightbox метод"
description: "закрывает lightbox"
---

# endLightbox

### Description

@short: Закрывает lightbox

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - если установлен в <i>true</i>, изменения, сделанные в lightbox, будут сохранены перед закрытием. <br> Если - <i>false</i>, изменения будут отменены.
- `box` - (optional) *HTMLElement* - HTML-контейнер для lightbox

### Example

~~~jsx
scheduler.endLightbox(false);
//или
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Полностью настраиваемый lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note

Метод используется при создании настраиваемого lightbox
 
:::