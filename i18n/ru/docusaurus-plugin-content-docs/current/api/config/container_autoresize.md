---
sidebar_label: "container_autoresize"
title: "container_autoresize config"
description: "позволяет контейнеру scheduler автоматически подстраивать свой размер под весь контент без необходимости прокрутки"
---

# container_autoresize

### Description

@short: Позволяет контейнеру scheduler автоматически подстраивать свой размер под весь контент без необходимости прокрутки

@signature: container_autoresize: boolean

### Example

~~~jsx
scheduler.config.container_autoresize = false;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** true

### Related samples
- [Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

### Details

:::note
 Это свойство становится активным после включения плагина [container_autoresize](guides/extensions-list.md#containerautoresize). 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)
