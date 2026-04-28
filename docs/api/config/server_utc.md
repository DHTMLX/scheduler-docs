---
sidebar_label: server_utc
title: "server_utc config"
description: "enables converting server-side dates from UTC to a local time zone (and backward) while sending data to the server"
---

# server_utc

### Description

@short: Enables converting server-side dates from UTC to a local time zone (and backward) while sending data to the server

@signature: server_utc: boolean

### Example

~~~jsx
scheduler.config.server_utc = true;

scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false
