---
sidebar_label: "uid"
title: "uid method"
description: "erstellt eine eindeutige ID, die garantiert innerhalb der aktuellen Scheduler-Instanz eindeutig ist (kein globaler GUID)"
---

# uid

### Description

@short: Erstellt eine eindeutige ID, die garantiert innerhalb der aktuellen Scheduler-Instanz eindeutig ist (kein globaler GUID)

@signature: uid: () =\> number

### Returns
- ` uid` - (number) - die generierte eindeutige ID

### Example

~~~jsx
var new_id = scheduler.uid();
~~~
