---
sidebar_label: "parse_date"
title: "parse_date template"
description: "wandelt einen Datumsstring in ein Date-Objekt um"
---

# parse_date

### Description

@short: Wandelt einen Datumsstring in ein Date-Objekt um

@signature: parse_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - der String, der konvertiert werden soll

### Returns
- ` date` - (Date) - Date-Objekt

### Example

~~~jsx
const cfg = scheduler.config;
const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

Diese Funktion wird durch **scheduler.load()** oder **scheduler.parse()** ausgelöst, wenn die *start_date/end_date*-Eigenschaften von Events geparst werden, vorausgesetzt, sie liegen als Strings vor. 
Sie können diese Funktion überschreiben, wenn Ihr Datumsformat anders ist und der Standardparser nicht funktioniert. Details finden Sie in [Datumsformat-Spezifikation](guides/settings-format.md).

[Mehr über Date-Objekte lesen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Daten laden](guides/loading-data.md)
- [Datumsformat-Spezifikation](guides/settings-format.md)
- [Serverseitige Integration](guides/server-integration.md)
