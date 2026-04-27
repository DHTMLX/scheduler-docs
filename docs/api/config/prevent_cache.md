---
sidebar_label: prevent_cache
title: "prevent_cache config"
description: "enables/disables caching of GET requests in the browser"
---

# prevent_cache

### Description

@short: Enables/disables caching of GET requests in the browser

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

Enabling the property is recommended.
