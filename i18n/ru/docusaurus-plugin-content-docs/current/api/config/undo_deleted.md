---
sidebar_label: undo_deleted
title: "undo_deleted конфигурация"
description: "обеспечивает всплывающее окно Undo при удалении события"
---

# undo_deleted

### Description

@short: Предоставляет всплывающее окно Undo при удалении события

@signature: undo_deleted: boolean

### Example

~~~jsx
// отключает всплывающее окно Undo
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Значение по умолчанию:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- Добавлено в версии 7.1