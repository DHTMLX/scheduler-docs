---
sidebar_label: "wide_form"
title: "wide_form config"
description: "управляет отображением стандартного (широкого) lightbox вместо короткой версии"
---

# wide_form

### Description

@short: Управляет отображением стандартного (широкого) lightbox вместо короткой версии

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

Стандартный (широкий) lightbox включён по умолчанию в стандартной skin и не может быть заменён на короткую версию
 
:::

<br>

- Стандартный lightbox

![wide_form_false](/img/wide_form_false.png)

- Широкий lightbox

![wide_form_true](/img/wide_form_true.png)
