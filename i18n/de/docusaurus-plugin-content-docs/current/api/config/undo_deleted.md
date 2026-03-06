---
sidebar_label: "undo_deleted"
title: "undo_deleted config"
description: "Aktiviert das Undo-Popup, das nach dem Löschen eines Events erscheint"
---

# undo_deleted

### Description

@short: Aktiviert das Undo-Popup, das nach dem Löschen eines Events erscheint

@signature: undo_deleted: boolean

### Example

~~~jsx
// schaltet das Undo-Popup aus
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- Hinzugefügt in Version 7.1
