---
sidebar_label: "parse_exact_format"
title: "parse_exact_format config"
description: "Steuert, ob der Scheduler das Datumsformat beim Parsen strikt einhalten soll"
---

# parse_exact_format

### Description

@short: Steuert, ob der Scheduler das Datumsformat beim Parsen strikt einhalten soll

@signature: parse_exact_format: boolean

### Example

~~~jsx
scheduler.config.parse_exact_format = true;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// Der Datumsstring muss exakt dem angegebenen Format entsprechen

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2019-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// Der Scheduler versucht, das Format des übergebenen Datumsstrings zu erkennen

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Tue Jan 15 2019 12:00:00  

parseDate("2019-01-15T12:00");
// -> Tue Jan 15 2019 12:00:00
~~~

**Default value:** false

### Details

Standardmäßig versucht der Scheduler, das Format von Daten, die an die Methode [scheduler.date.str_to_date()](api/other/date.md) übergeben werden, automatisch zu erkennen. 
Wenn Sie möchten, dass das Parsen strikt gemäß dem vom Benutzer angegebenen Format erfolgt, aktivieren Sie die Option **parse_exact_format**, indem Sie sie auf *true* setzen.

### Related Guides
- [Operationen mit Datumsangaben](guides/date-formats.md)
