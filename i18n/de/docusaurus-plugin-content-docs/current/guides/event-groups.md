---
sidebar_label: Ereignisgruppen
title: Ereignisgruppen
description: Scheduler-Ereignisse anhand einer benannten Sammlung einfärben, ein- oder ausblenden
---

# Ereignisgruppen

Ereignisgruppen sind im Scheduler-Kern sowohl in der GPL- als auch in der PRO-Edition verfügbar. Ein Ereignis besitzt einen Gruppenschlüssel in einer konfigurierbaren Eigenschaft. Gruppen können Kalender, Ereignistypen, Projekte oder Teams darstellen; eine Sidebar oder ein Plug-in ist nicht erforderlich.

```js
scheduler.config.event_groups = { list: "event_groups", property: "group", default: "work" };
scheduler.serverList("event_groups", [
  { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
  { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
scheduler.init("scheduler_here", new Date(), "week");
scheduler.parse([{ id: 1, start_date: "2026-10-19 09:00", end_date: "2026-10-19 10:00", group: "work" }]);
```

Wenn `event_groups` auf `{}` gesetzt wird, werden die Sammlung `event_groups` und die Ereigniseigenschaft `group` verwendet. Ein Objekt, das kein Array ist, aktiviert die Funktion; `undefined`, `null`, `false` oder das Entfernen des Konfigurationsschlüssels deaktiviert sie beim nächsten Rendern. Konfigurationsänderungen nach `init()` werden beim nächsten `scheduler.render()` wirksam. React-, Vue- und Angular-Wrapper wenden Hinzufügungen, Änderungen und das Entfernen über ihre `config`-Property bzw. -Eingabe an. Pro Scheduler-Instanz kann eine `event_groups`-Konfiguration mit einem Sammlungsnamen und einer Ereigniseigenschaft aktiv sein.

Gruppenelemente besitzen die Felder `key`, `label` sowie optional `color`, `textColor` und `active`. In JSON-Sammlungen wird `value` als Alias akzeptiert und `key` zugeordnet. Andere Felder bleiben für Anwendungscode verfügbar. Insbesondere hat `readonly` derzeit keine integrierte Wirkung: Diese Version bietet keine Steuerelemente zum Hinzufügen, Bearbeiten oder Löschen von Gruppen. Eine Gruppe wird nur ausgeblendet, wenn `active === false`. Ein Ereignis in einer ausgeblendeten Gruppe bleibt geladen, erscheint jedoch weder in Ansichten noch in Ereignismarkierungen des Mini-Kalenders. Das Ausblenden entfernt keine Units-Spalte oder Timeline-Zeile. Ansichts- und Wrapper-Filter gelten weiterhin zusätzlich zur Gruppensichtbarkeit.

Schlüssel können nicht leere Zeichenketten, endliche Zahlen oder boolesche Werte sein. Der Abgleich folgt den Zeichenkettenwerten des Lightbox-Select-Steuerelements: `1` und `"1"` bezeichnen dieselbe Gruppe. Das erste Element mit passendem Schlüssel gewinnt. Ungültige Elemente und spätere Duplikate werden ignoriert. Ereigniswerte wie `undefined`, `null`, `""`, unbekannte Schlüssel, Arrays und andere Multisection-Werte sind nicht gruppiert: Sie bleiben sichtbar und erhalten keine Gruppenfarbe. Verwenden Sie keine Multisection-Eigenschaft als Gruppeneigenschaft.

Die beiden Farbkanäle werden unabhängig aufgelöst: `color` oder `textColor` des Ereignisses hat Vorrang, danach eine CSS-Regel des Ereignisknotens wie `event_class`, anschließend die entsprechende Gruppenfarbe und schließlich das Theme. Leere oder null Gruppenfarben fallen auf CSS oder das Theme zurück.

Neue Ereignisse, die über die Scheduler-Oberfläche oder `addEventNow()` erstellt werden, erhalten die konfigurierte `default`-Gruppe, wenn sie aktiv ist, andernfalls die erste aktive Gruppe. Ist keine Gruppe aktiv, bleibt die Eigenschaft leer und das Ereignis wird angezeigt. Scheduler füllt nur `undefined`, `null` oder `""`; an `addEventNow()` übergebene Werte und Änderungen in `onEventCreated` bleiben erhalten. Anwendungscode kann bewusst eine ausgeblendete Gruppe zuweisen, wodurch das Ereignis verborgen wird. Geladene Ereignisse und normale Importe behalten ihre Werte.

Mit `scheduler.ext.eventGroups.setActive(key, active)` schalten Sie eine Gruppe um, mit `isActive(key)` lesen Sie ihren Zustand. `setActive` löst das abbrechbare `onBeforeEventGroupActiveChange(key, active)` und nach erfolgreicher Änderung `onEventGroupActiveChange(key, active)` aus. Ersetzen Sie Gruppen mit `scheduler.updateCollection("event_groups", items)` oder JSON-`collections`; auch diese Wege berücksichtigen Änderungsablehnungen für Schlüssel in beiden Listen. Direkte Änderungen an Elementen werden beim nächsten expliziten Rendern sichtbar, lösen jedoch keine automatische Neuzeichnung aus.

Damit Benutzer die Gruppe eines Ereignisses in der Lightbox ändern können, fügen Sie einen Select-Abschnitt samt Beschriftung hinzu:

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", options: scheduler.serverList("event_groups"), map_to: "group" },
  { name: "time", type: "time", map_to: "auto" }
];
```

Ereignisgruppen ändern weder die Standard-Lightbox noch fügen sie Steuerelemente zur Gruppenbearbeitung hinzu.

[Beispiel für Sidebar und Ereignisgruppenliste](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
