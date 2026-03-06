---
sidebar_label: "server_utc"
title: "server_utc config"
description: "позволяет конвертировать серверные даты между UTC и локальными часовыми поясами при обмене данными с сервером"
---

# server_utc

### Description

@short: Позволяет конвертировать серверные даты между UTC и локальными часовыми поясами при обмене данными с сервером

@signature: server_utc: boolean

### Example

~~~jsx
scheduler.config.server_utc = true;

scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** false
