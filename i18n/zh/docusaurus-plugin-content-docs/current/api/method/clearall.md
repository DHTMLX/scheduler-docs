---
sidebar_label: "clearAll"
title: "clearAll method"
description: "从调度器中移除所有事件"
---

# clearAll

### Description

@short: 从调度器中移除所有事件

@signature: clearAll: () =\> void

### Example

~~~jsx
scheduler.clearAll();
~~~

### Details

请注意，此方法会触发 [onClearAll](api/event/onclearall.md) 事件。

### Related API
- [onClearAll](api/event/onclearall.md)
