---
sidebar_label: container_autoresize
title: "container_autoresize config"
description: "forces the scheduler container to automatically change its size to show the whole content without scrolling"
---

# container_autoresize

### Description

@short: Forces the scheduler container to automatically change its size to show the whole content without scrolling

@signature: container_autoresize: boolean

### Example

~~~jsx
scheduler.config.container_autoresize = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Related samples
- [Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

### Details

:::note
 The property will be enabled after you enable the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin. 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)
