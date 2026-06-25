---
sidebar_label: "container_autoresize"
title: "container_autoresize config"
description: "sorgt dafür, dass der Scheduler-Container seine Größe automatisch an den gesamten Inhalt anpasst, ohne dass gescrollt werden muss"
---

# container_autoresize

### Description

@short: Sorgt dafür, dass der Scheduler-Container seine Größe automatisch an den gesamten Inhalt anpasst, ohne dass gescrollt werden muss

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
 Diese Eigenschaft wird aktiv, sobald das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin aktiviert ist. 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)
