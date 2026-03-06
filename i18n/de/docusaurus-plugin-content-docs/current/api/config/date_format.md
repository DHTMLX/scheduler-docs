---
sidebar_label: "date_format"
title: "date_format config"
description: "definiert das Datumsformat, das zum Parsen von Daten aus einem Datensatz und zum Zurücksenden von Daten an den Server verwendet wird"
---

# date_format

### Description

@short: Definiert das Datumsformat, das zum Parsen von Daten aus einem Datensatz und zum Zurücksenden von Daten an den Server verwendet wird

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** "%Y-%m-%d %H:%i"

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

Diese Konfigurationsoption ist verantwortlich für die Generierung der Template-Funktionen [parse_date](api/template/parse_date.md) und [format_date](api/template/format_date.md). 
Um ein benutzerdefiniertes Format zu verwenden, können Sie entweder diese Einstellung aktualisieren oder direkt die **parse_date** und **format_date** Templates überschreiben.

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Datumsformat-Spezifikation](guides/settings-format.md)
