---
sidebar_label: server_utc
title: "server_utc конфигурация"
description: "включает преобразование дат на стороне сервера из UTC в локальную временную зону (и обратно) при отправке данных на сервер"
---

# server_utc

### Description

@short: Позволяет преобразовывать даты на стороне сервера из UTC в локальную временную зону (и обратно) при отправке данных на сервер

@signature: server_utc: boolean

### Example

~~~jsx
scheduler.config.server_utc = true;

scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** false