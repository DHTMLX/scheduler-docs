---
sidebar_label: "endLightbox"
title: "endLightbox method"
description: "用于关闭lightbox"
---

# endLightbox

### Description

@short: 用于关闭lightbox

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - 当设置为<i>true</i>时，lightbox中的任何更改将在关闭前保存。<br>如果设置为<i>false</i>，更改将被丢弃。
- `box` - (optional) *HTMLElement* - 包含lightbox的HTML元素

### Example

~~~jsx
scheduler.endLightbox(false);
//或
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note

此方法通常在使用自定义lightbox时调用
 
:::
