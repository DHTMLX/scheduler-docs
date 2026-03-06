---
sidebar_label: "mixin"
title: "mixin method"
description: "'source' 객체의 속성을 'target' 객체에 병합합니다."
---

# mixin

### Description

@short: 'source' 객체의 속성을 'target' 객체에 병합합니다.

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - 새로운 속성을 받을 객체
- `source` - (required) *object* - 추가할 속성을 제공하는 객체
- `force` - (required) *boolean* - 참일 경우, 'source'의 속성이 'target'에 있는 기존 속성을 덮어씀; 거짓일 경우, 기존 'target' 속성은 변경되지 않음

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- 버전 6.0에 추가됨
