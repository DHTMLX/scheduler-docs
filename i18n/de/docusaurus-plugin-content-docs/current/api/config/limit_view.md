---
sidebar_label: "limit_view"
title: "limit_view config"
description: "beschränkt den Datumsbereich, innerhalb dessen Benutzer Ereignisse durchsuchen können"
---

# limit_view

### Description

@short: Beschränkt den Datumsbereich, innerhalb dessen Benutzer Ereignisse durchsuchen können

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Default value:** false

### Details

Beispielsweise bedeutet das Setzen einer Begrenzung auf das Jahr 2028, dass Benutzer nicht zu 2027 navigieren können - nur Daten innerhalb von 2028 sind zugänglich.

Wenn die Einstellungen **limit_start/limit_end** ebenfalls definiert sind, um den Zeitraum für das Erstellen neuer Ereignisse einzuschränken, verhindert **limit_view** das Anzeigen von Ereignissen außerhalb dieses erlaubten Datumsbereichs.

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

Mit dieser Konfiguration können Ereignisse nur zwischen dem 15. Juni und dem 15. Juli erstellt werden, und die Kalendernavigation ist ebenfalls auf diese Daten beschränkt.

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
