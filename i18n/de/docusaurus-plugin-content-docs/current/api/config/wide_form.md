---
sidebar_label: "wide_form"
title: "wide_form config"
description: "steuert, ob die Standard-(wide) Lightbox anstelle der kurzen Version angezeigt wird"
---

# wide_form

### Description

@short: Steuert, ob die Standard-(wide) Lightbox anstelle der kurzen Version angezeigt wird

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

Die Standard-(wide) Lightbox ist im Standard-Skin standardmäßig aktiviert und kann nicht auf die kurze Version umgestellt werden
 
:::

<br>

- Standard Lightbox

![wide_form_false](/img/wide_form_false.png)

- Wide Lightbox

![wide_form_true](/img/wide_form_true.png)
