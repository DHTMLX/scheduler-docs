---
sidebar_label: "prevent_cache"
title: "prevent_cache config"
description: "控制浏览器中是否启用GET请求缓存"
---

# prevent_cache

### Description

@short: 控制浏览器中是否启用GET请求缓存

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

通常建议启用此属性。
