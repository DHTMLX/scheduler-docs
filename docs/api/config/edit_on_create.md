---
sidebar_label: edit_on_create
title: "edit_on_create config"
description: "'says' to open the lightbox while creating new events"
---

# edit_on_create

### Description

@short: 'says' to open the lightbox while creating new events

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true
