---
sidebar_label: "copy"
title: "copy method"
description: "erstellt eine tiefe Kopie des angegebenen Objekts"
---

# copy

### Description

@short: Erstellt eine tiefe Kopie des angegebenen Objekts

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (required) *object* - das zu duplizierende Objekt

### Returns
- ` backupEvent` - (object) - eine tiefe Kopie des angegebenen Objekts

### Example

~~~jsx
const backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- hinzugefügt in Version 6.0
