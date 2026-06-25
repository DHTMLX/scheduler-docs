---
sidebar_label: "undo_deleted"
title: "undo_deleted config"
description: "이벤트 삭제 후 나타나는 Undo 팝업을 활성화합니다."
---

# undo_deleted

### Description

@short: 이벤트 삭제 후 나타나는 Undo 팝업을 활성화합니다.

@signature: undo_deleted: boolean

### Example

~~~jsx
// Undo 팝업을 비활성화합니다.
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- v7.1에 추가됨
