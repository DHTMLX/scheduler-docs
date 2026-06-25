---
sidebar_label: "format_date"
title: "format_date template"
description: "wandelt ein Date-Objekt in einen formatierten Datumsstring um. Dies ist nützlich, um Datumsangaben zurück an den Server zu senden."
---

# format_date

### Description

@short: Wandelt ein Date-Objekt in einen formatierten Datumsstring um. Dies ist nützlich, um Datumsangaben zurück an den Server zu senden.

@signature: format_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - eine String-Darstellung des Datums

### Example

~~~jsx
const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Siehe [Datumsformat-Spezifikation](guides/settings-format.md) für weitere Details.

### Related Guides
- [Daten laden](guides/loading-data.md)
- [Operationen mit Datumsangaben](guides/date-formats.md)
- [Serverseitige Integration](guides/server-integration.md)
- [Datumsformat-Spezifikation](guides/settings-format.md)
