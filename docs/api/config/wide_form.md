---
sidebar_label: wide_form
title: "wide_form config"
description: "enables/disables displaying of the standard (wide) lightbox instead of the short one"
---

# wide_form

### Description

@short: Enables/disables displaying of the standard (wide) lightbox instead of the short one

@signature: wide_form: boolean

### Example

~~~jsx
scheduler.config.wide_form = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** true

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note

The standard (wide) lightbox is initially enabled in the default skin and can't be switched to the short one
 
:::

<br>

- Standard lightbox

![wide_form_false](/img/wide_form_false.png)

- Wide lightbox

![wide_form_true](/img/wide_form_true.png)
