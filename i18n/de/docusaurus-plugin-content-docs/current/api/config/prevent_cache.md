---
sidebar_label: "prevent_cache"
title: "prevent_cache config"
description: "Steuert, ob das Caching von GET-Anfragen im Browser aktiviert oder deaktiviert ist"
---

# prevent_cache

### Description

@short: Steuert, ob das Caching von GET-Anfragen im Browser aktiviert oder deaktiviert ist

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

Es ist generell empfehlenswert, diese Eigenschaft zu aktivieren.
