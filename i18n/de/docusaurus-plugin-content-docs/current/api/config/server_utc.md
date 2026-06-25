---
sidebar_label: "server_utc"
title: "server_utc config"
description: "Ermöglicht die Umwandlung von serverseitigen Datumsangaben zwischen UTC und lokalen Zeitzonen beim Datenaustausch mit dem Server"
---

# server_utc

### Description

@short: Ermöglicht die Umwandlung von serverseitigen Datumsangaben zwischen UTC und lokalen Zeitzonen beim Datenaustausch mit dem Server

@signature: server_utc: boolean

### Example

~~~jsx
scheduler.config.server_utc = true;

scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false
