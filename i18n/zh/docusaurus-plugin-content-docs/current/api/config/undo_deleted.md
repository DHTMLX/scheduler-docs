---
sidebar_label: "undo_deleted"
title: "undo_deleted config"
description: "启用删除事件后出现的Undo弹出窗口"
---

# undo_deleted

### Description

@short: 启用删除事件后出现的Undo弹出窗口

@signature: undo_deleted: boolean

### Example

~~~jsx
// 关闭Undo弹出窗口
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![undo_deleted_config](/img/undo_deleted_config.png)

### Change log
- 在v7.1版本中添加
