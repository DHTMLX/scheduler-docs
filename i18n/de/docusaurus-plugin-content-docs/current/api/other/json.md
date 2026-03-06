---
sidebar_label: "json"
title: "json config"
description: "verwaltet JSON-Serialisierung und -Parsing"
---

# json

### Description

@short: Verwaltet JSON-Serialisierung und -Parsing

@signature: json: any

### Example

~~~jsx
var obj = scheduler.json; // -> { parse(data){... 
:::
~~~

### Details

Das JSON-Objekt enthält ein einzelnes Mitglied - die **parse()**-Methode, die bestimmt, wie der Scheduler Daten im JSON-Format verarbeitet.
