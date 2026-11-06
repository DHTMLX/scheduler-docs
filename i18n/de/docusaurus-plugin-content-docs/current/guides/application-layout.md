---
title: "Anwendungslayout"
sidebar_label: "Anwendungslayout"
description: "Ein Scheduler-Layout mit Toolbar, Sidebar und Ereignisgruppen erstellen"
---

# Anwendungslayout

Verwenden Sie die Toolbar- und Sidebar-Plug-ins, um ein Ereigniskalender-Layout zu erstellen. Ereignisgruppen sind eine Kernfunktion von Scheduler: Sie liefern die Kalenderlistendaten, filtern inaktive Gruppen und wenden Gruppenfarben an.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.event_groups = { list: "event_groups", property: "group" };
scheduler.init("scheduler_here");
scheduler.parse({ data, collections: { event_groups } });
```

Ohne Header- oder Sidebar-Konfiguration rendert Scheduler diesen Header:

```js
["toggle_sidebar", "add_event", "spacer", "prev", "date", "next", "spacer", "today", "views"]
```

Die Sidebar enthält `minicalendar` und `event_groups`, ist 260 Pixel breit und wird unterhalb von 768 Pixeln zum Overlay. Ihre Ereignisgruppenliste heißt auf Englisch **Calendars**, während die API das Datenmodell weiterhin Ereignisgruppen nennt.

Fügen Sie einen Lightbox-Abschnitt hinzu, wenn Benutzer eine Ereignisgruppe auswählen müssen:

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", map_to: "group", options: scheduler.serverList("event_groups") },
  { name: "time", type: "time", map_to: "auto" }
];
```

## Einen Teil ändern

Verwenden Sie ein Menü für Ansichten oder ändern Sie die Ereignisgruppenbeschriftung, ohne das Layout neu aufzubauen:

```js
scheduler.config.header = ["toggle_sidebar", "prev", "date", "next", { id: "views", comp: "menu" }];
scheduler.config.sidebar = {
  items: ["minicalendar", { id: "event_groups", label: "My calendars" }]
};
```

## Anwendungsinhalte hinzufügen

Toolbar-`container`-Elemente und benutzerdefinierte Sidebar-Elemente sind leere Knoten im Besitz der Anwendung.

```js
scheduler.config.header = ["prev", { id: "search", comp: "container" }, "next"];
scheduler.config.sidebar = { items: [{ id: "summary" }, "minicalendar", "event_groups"] };

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.innerHTML = '<input aria-label="Search events">';
});
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "summary") node.textContent = "Upcoming work";
});
```

Framework-Wrapper können diese Inhalte direkt besitzen. Ordnen Sie Element-IDs über React `toolbarComponents` / `sidebarComponents`, Vue `toolbar-components` / `sidebar-components` oder Angular `[toolbarComponents]` / `[sidebarComponents]` zu. Die Wrapper hängen Portale, Teleports oder Angular-Komponenteninstanzen in dieselben stabilen Knoten ein und bereinigen sie, wenn ein Element oder Scheduler zerstört wird. Siehe die Konfigurationsanleitungen für [React](integrations/react/configuration-props.md#toolbar-and-sidebar-components), [Vue](integrations/vue/configuration-props.md#toolbar-and-sidebar-components) und [Angular](integrations/angular/configuration-props.md#toolbar-and-sidebar-components).

## Vorhandenes Scheduler-Markup

Enthält das an `init()` übergebene Element bereits Legacy-Scheduler-Markup, verwenden Toolbar und Sidebar den permanenten Markup-Fallback. Scheduler behält das Markup und erstellt weder Layout-Shell, Toolbar noch Sidebar. Ersetzen Sie das Legacy-Kind-Markup durch einen leeren Host, bevor Sie Layout-Plug-ins aktivieren.

Siehe [Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md), [Ereignisgruppen](guides/event-groups.md) und [header](api/config/header.md).

- [Toolbar-Layout-Beispiel](https://docs.dhtmlx.com/scheduler/samples/16_layout/01_toolbar.html)
- [Sidebar-Layout-Beispiel](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
- [Vollständiges responsives Anwendungslayout](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)
