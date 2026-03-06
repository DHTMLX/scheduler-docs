---
sidebar_label: "container_autoresize"
title: "container_autoresize config"
description: "스케줄러 컨테이너가 전체 내용을 스크롤 없이 모두 표시할 수 있도록 자동으로 크기를 조절합니다."
---

# container_autoresize

### Description

@short: 스케줄러 컨테이너가 전체 내용을 스크롤 없이 모두 표시할 수 있도록 자동으로 크기를 조절합니다.

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
 이 속성은 [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인이 활성화된 경우에만 동작합니다. 
::: 

![container_autoresize_property](/img/container_autoresize_property.png)
