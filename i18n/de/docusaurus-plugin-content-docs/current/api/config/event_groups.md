---
sidebar_label: event_groups
title: "event_groups-Konfiguration"
description: "konfiguriert Ereignisgruppen-Sammlungen"
---

# event_groups

### Beschreibung

@short: Konfiguriert Ereignisgruppen-Sammlungen

@signature: event_groups: EventGroupsConfig | false

### Beispiel

~~~js
scheduler.config.event_groups = { list: "calendars", property: "calendarId", default: "work" };
scheduler.serverList("calendars", [
    { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
    { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
~~~

### Details

Ereignisgruppen sind eine Kernfunktion und benötigen kein Plug-in. Ein konfiguriertes Objekt aktiviert sie; `false`, `null` oder ein fehlender Wert deaktiviert sie beim nächsten Rendern. Die Standardwerte sind `list: "event_groups"` und `property: "group"`.

### Konfigurationsoptionen

| Option | Typ | Beschreibung |
| --- | --- | --- |
| `list` | *string* | Der Name der Sammlung, in der die Gruppendefinitionen gespeichert sind. Der Standardwert ist `"event_groups"`. |
| `property` | *string* | Die Ereigniseigenschaft, in der ein Gruppenschlüssel gespeichert ist. Der Standardwert ist `"group"`. |
| `default` | *string \| number \| boolean* | Der Schlüssel, der einem neu erstellten Ereignis zugewiesen wird, wenn er eine aktive Gruppe bezeichnet. |

Jedes Sammlungselement verwendet die Eigenschaften `key`, `label` sowie optional `color`, `textColor` und `active`. Inaktive Gruppen blenden ihre Ereignisse aus. Unbekannte, leere, Array- und andere Multisection-Werte bleiben ohne Gruppenfarbe sichtbar. Verwenden Sie keine Multisection-Eigenschaft als `property`.

`default` wird neu erstellten Ereignissen zugewiesen, wenn der Wert eine aktive Gruppe bezeichnet. Andernfalls verwendet Scheduler die erste aktive Gruppe. Ereignisgruppen fügen der Standard-Lightbox keinen Abschnitt hinzu; fügen Sie einen `select`-Abschnitt hinzu, wenn Benutzer eine Gruppe auswählen müssen.

### Verwandte API

- [eventGroups](api/other/eventgroups.md)

### Verwandte Anleitungen

- [Ereignisgruppen](guides/event-groups.md)
- [Benutzerdefinierte Ereignisfarben](guides/custom-events-color.md)