---
sidebar_label: "copy"
title: "copy method"
description: "주어진 객체의 깊은 복사본을 생성합니다."
---

# copy

### Description

@short: 주어진 객체의 깊은 복사본을 생성합니다.

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (required) *object* - 복제할 객체

### Returns
- ` backupEvent` - (object) - 주어진 객체의 깊은 복사본

### Example

~~~jsx
const backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- 6.0 버전에 추가됨
