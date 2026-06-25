---
sidebar_label: "prevent_cache"
title: "prevent_cache config"
description: "브라우저에서 GET 요청 캐싱을 활성화할지 비활성화할지 제어합니다."
---

# prevent_cache

### Description

@short: 브라우저에서 GET 요청 캐싱을 활성화할지 비활성화할지 제어합니다.

@signature: prevent_cache: boolean

### Example

~~~jsx
scheduler.config.prevent_cache = true;
...
scheduler.init('scheduler_here',new Date(2027,10,1),"month");
~~~

**Default value:** false

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

이 속성은 일반적으로 활성화하는 것이 좋습니다.
