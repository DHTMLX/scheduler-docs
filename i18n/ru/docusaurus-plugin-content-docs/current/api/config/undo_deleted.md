---
sidebar_label: "undo_deleted"
title: "undo_deleted config"
description: "Включает появление всплывающего окна Undo после удаления события"
---

# undo_deleted

### Description

@short: Включает появление всплывающего окна Undo после удаления события

@signature: undo_deleted: boolean

### Example

~~~jsx
// отключает всплывающее окно Undo
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- Добавлено в версии v7.1
