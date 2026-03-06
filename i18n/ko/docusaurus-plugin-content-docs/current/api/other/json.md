---
sidebar_label: "json"
title: "json config"
description: "JSON 직렬화 및 파싱을 처리합니다"
---

# json

### Description

@short: JSON 직렬화 및 파싱을 처리합니다

@signature: json: any

### Example

~~~jsx
var obj = scheduler.json; // -> { parse(data){... }}
~~~

### Details

JSON 객체는 단일 멤버인 **parse()** 메서드를 포함하며, 이 메서드는 스케줄러가 JSON 형식으로 된 데이터를 처리하는 방식을 결정합니다.
