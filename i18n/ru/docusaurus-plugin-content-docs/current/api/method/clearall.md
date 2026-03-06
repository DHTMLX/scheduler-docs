---
sidebar_label: "clearAll"
title: "clearAll method"
description: "удаляет все события из планировщика"
---

# clearAll

### Description

@short: Удаляет все события из планировщика

@signature: clearAll: () =\> void

### Example

~~~jsx
scheduler.clearAll();
~~~

### Details

Имейте в виду, что этот метод вызывает событие [onClearAll](api/event/onclearall.md).

### Related API
- [onClearAll](api/event/onclearall.md)
