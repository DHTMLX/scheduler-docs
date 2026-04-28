---
sidebar_label: "container_autoresize"
title: "container_autoresize config"
description: "使调度器的容器自动调整大小以适应全部内容，无需滚动"
---

# container_autoresize

### Description

@short: 使调度器的容器自动调整大小以适应全部内容，无需滚动

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
 此属性在启用 [container_autoresize](guides/extensions-list.md#containerautoresize) 插件后生效。 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)
