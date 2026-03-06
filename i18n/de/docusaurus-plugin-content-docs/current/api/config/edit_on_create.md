---
sidebar_label: "edit_on_create"
title: "edit_on_create config"
description: "Ermöglicht das Öffnen der Lightbox beim Erstellen neuer Events"
---

# edit_on_create

### Description

@short: Ermöglicht das Öffnen der Lightbox beim Erstellen neuer Events

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true
