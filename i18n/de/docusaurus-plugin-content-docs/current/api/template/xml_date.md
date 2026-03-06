---
sidebar_label: "xml_date"
title: "xml_date template"
description: "Diese Vorlage konvertiert einen String aus einer XML-Datei in ein Date-Objekt basierend auf dem angegebenen Format."
---

# xml_date
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Diese Vorlage konvertiert einen String aus einer XML-Datei in ein Date-Objekt basierend auf dem angegebenen Format.

@signature: xml_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - der zu parsende String

### Returns
- ` date` - (Date) - ein Date-Objekt

### Example

~~~jsx
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 Diese Vorlage ist veraltet. Bitte verwenden Sie stattdessen [parse_date](api/template/parse_date.md): 
:::

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Daten laden](guides/loading-data.md)

### Change log
- Als veraltet markiert seit Version 5.2
