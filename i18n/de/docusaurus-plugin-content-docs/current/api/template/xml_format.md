---
sidebar_label: "xml_format"
title: "xml_format template"
description: "Ein Date-Objekt wird in einen String umgewandelt, der einem spezifischen Template folgt. Dies wird hauptsächlich verwendet, wenn Daten zurück an den Server gesendet werden."
---

# xml_format
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Ein Date-Objekt wird in einen String umgewandelt, der einem spezifischen Template folgt. Dies wird hauptsächlich verwendet, wenn Daten zurück an den Server gesendet werden.

@signature: xml_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - eine String-Darstellung des Datums

### Example

~~~jsx
var cfg = scheduler.config;
var    date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
    return date_to_str(date);
};
~~~

### Details

:::note
 Diese Vorlage ist veraltet. Bitte verwenden Sie stattdessen [format_date](api/template/format_date.md): 
:::

~~~js
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Related Guides
- [Daten laden](guides/loading-data.md)
- [Serverseitige Integration](guides/server-integration.md)

### Change log
- deprecated seit v5.2
