---
sidebar_label: wide_form
title: "wide_form конфигурация"
description: "включает/отключает отображение стандартного (широкого) лайтбокса вместо короткого"
---

# wide_form

### Description

@short: Включает/выключает отображение стандартного (широкого) лайтбокса вместо короткого

@signature: wide_form: boolean

### Example

~~~jsx
scheduler.config.wide_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Значение по умолчанию:** true

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note

Стандартный (широкий) лайтбокс по умолчанию включен в стандартной теме и его нельзя переключить на короткий.

:::

<br>

- Стандартный лайтбокс

![wide_form_false](/img/wide_form_false.png)

- Широкий лайтбокс

![wide_form_true](/img/wide_form_true.png)