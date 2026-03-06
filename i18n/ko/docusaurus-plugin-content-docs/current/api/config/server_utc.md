---
sidebar_label: "server_utc"
title: "server_utc config"
description: "서버와 데이터를 주고받을 때 서버 측 날짜를 UTC와 로컬 타임존 간에 변환할 수 있도록 합니다."
---

# server_utc

### Description

@short: 서버와 데이터를 주고받을 때 서버 측 날짜를 UTC와 로컬 타임존 간에 변환할 수 있도록 합니다.

@signature: server_utc: boolean

### Example

~~~jsx
scheduler.config.server_utc = true;

scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false
