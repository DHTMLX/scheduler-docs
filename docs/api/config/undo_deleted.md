---
sidebar_label: undo_deleted
title: "undo_deleted config"
description: "provides the Undo popup when you delete an event"
---

# undo_deleted

### Description

@short: Provides the Undo popup when you delete an event

@signature: undo_deleted: boolean

### Example

~~~jsx
// disables the Undo popup showing
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- Added in v7.1
