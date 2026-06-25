---
sidebar_label: container_autoresize
title: "конфигурация container_autoresize"
description: "заставляет контейнер планировщика автоматически изменять размер, чтобы отобразить все содержимое без прокрутки"
---

# container_autoresize

### Description

@short: Принуждает контейнер планировщика автоматически изменять размер, чтобы показать всё содержимое без прокрутки

@signature: container_autoresize: boolean

### Example

~~~jsx
scheduler.config.container_autoresize = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** true

### Related samples
- [Авторазмер контейнера планировщика](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

### Details

:::note
 Свойство будет включено после включения плагина [container_autoresize](guides/extensions-list.md#container-autoresize). 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)