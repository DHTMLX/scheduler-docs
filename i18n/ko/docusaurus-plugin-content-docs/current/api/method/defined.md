---
sidebar_label: "defined"
title: "defined method"
description: "인수가 undefined일 경우 false를 반환하며, 그렇지 않으면 true를 반환합니다."
---

# defined

### Description

@short: 인수가 undefined일 경우 false를 반환하며, 그렇지 않으면 true를 반환합니다.

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 확인할 객체

### Returns
- ` state` - (boolean) - 인수가 undefined일 경우 false, 그렇지 않으면 true

### Example

~~~jsx
// event 객체에 "custom_property" 속성이 defined 되어 있는지 확인합니다.
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- 6.0 버전에 추가됨
