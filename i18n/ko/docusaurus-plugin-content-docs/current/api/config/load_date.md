---
sidebar_label: "load_date"
title: "load_date config"
description: "동적 로딩 시 서버 요청 파라미터 'from'과 'to'의 형식을 정의합니다."
---

# load_date

### Description

@short: 동적 로딩 시 서버 요청 파라미터 'from'과 'to'의 형식을 정의합니다.

@signature: load_date: string

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");
~~~

**Default value:** "%Y-%m-%d"

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_format](api/template/load_format.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md#dynamic-loading)
