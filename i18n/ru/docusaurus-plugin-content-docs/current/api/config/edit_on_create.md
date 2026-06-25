---
sidebar_label: edit_on_create
title: "edit_on_create Конфигурация"
description: "для открытия lightbox во время создания новых событий"
---

# edit_on_create

### Description

@short: для открытия lightbox во время создания новых событий

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true