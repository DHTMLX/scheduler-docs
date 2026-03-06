---
sidebar_label: "endLightbox"
title: "endLightbox method"
description: "используется для закрытия lightbox"
---

# endLightbox

### Description

@short: Используется для закрытия lightbox

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - если установлено в <i>true</i>, все изменения, внесённые внутри lightbox, будут сохранены перед его закрытием. <br> Если установлено в <i>false</i>, изменения будут отменены.
- `box` - (optional) *HTMLElement* - HTML-элемент, который содержит lightbox

### Example

~~~jsx
scheduler.endLightbox(false);
//или
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note

Этот метод обычно вызывается при работе с кастомным lightbox
 
:::
