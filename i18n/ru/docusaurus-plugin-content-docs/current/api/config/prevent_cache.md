---
sidebar_label: "prevent_cache"
title: "prevent_cache config"
description: "Управляет включением или отключением кеширования GET-запросов в браузере"
---

# prevent_cache

### Description

@short: Управляет включением или отключением кеширования GET-запросов в браузере

@signature: prevent_cache: boolean

### Example

~~~jsx
scheduler.config.prevent_cache = true;
...
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
~~~

**Default value:** false

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

В большинстве случаев рекомендуется включать это свойство.
