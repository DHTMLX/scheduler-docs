---
sidebar_label: "json"
title: "json config"
description: "处理 JSON 序列化和解析"
---

# json

### Description

@short: 处理 JSON 序列化和解析

@signature: json: any

### Example

~~~jsx
const obj = scheduler.json; // -> { parse(data){... }}
~~~

### Details

JSON 对象包含一个成员--**parse()** 方法，该方法定义了调度器如何处理 JSON 格式的数据。
