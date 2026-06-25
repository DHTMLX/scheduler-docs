---
sidebar_label: "edit_on_create"
title: "edit_on_create config"
description: "允许在创建新事件时打开lightbox"
---

# edit_on_create

### Description

@short: 允许在创建新事件时打开lightbox

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** true
