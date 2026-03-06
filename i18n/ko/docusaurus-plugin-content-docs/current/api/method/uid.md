---
sidebar_label: "uid"
title: "uid method"
description: "현재 스케줄러 인스턴스 내에서 고유함이 보장되는 유니크 ID를 생성합니다 (전역 GUID가 아님)."
---

# uid

### Description

@short: 현재 스케줄러 인스턴스 내에서 고유함이 보장되는 유니크 ID를 생성합니다 (전역 GUID가 아님).

@signature: uid: () =\> number

### Returns
- ` uid` - (number) - 생성된 유니크 ID

### Example

~~~jsx
var new_id = scheduler.uid();
~~~
