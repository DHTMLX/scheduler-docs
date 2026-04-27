---
sidebar_label: "wide_form"
title: "wide_form config"
description: "控制是否显示标准（wide）lightbox，而非简短版本"
---

# wide_form

### Description

@short: 控制是否显示标准（wide）lightbox，而非简短版本

@signature: wide_form: boolean

### Example

~~~jsx
scheduler.config.wide_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** true

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note

默认皮肤中，标准（wide）lightbox 默认开启，且无法切换为简短版本
 
:::

<br>

- 标准 lightbox

![wide_form_false](/img/wide_form_false.png)

- Wide lightbox

![wide_form_true](/img/wide_form_true.png)
