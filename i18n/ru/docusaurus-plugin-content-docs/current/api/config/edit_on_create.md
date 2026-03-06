---
sidebar_label: "edit_on_create"
title: "edit_on_create config"
description: "Включает открытие лайтбокса при создании новых событий"
---

# edit_on_create

### Description

@short: Включает открытие лайтбокса при создании новых событий

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true
