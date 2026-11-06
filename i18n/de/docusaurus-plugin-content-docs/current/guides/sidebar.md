---
title: Sidebar
sidebar_label: Sidebar
---

# Sidebar

Das Sidebar-Plug-in rendert ein Panel neben dem Scheduler-Kalender. Aktivieren Sie es vor `init()`.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
  position: "left",
  width: 260,
  overlay_width: 768,
  items: ["minicalendar", "event_groups"]
};
scheduler.init("scheduler_here");
```

`minicalendar` und `event_groups` sind die Standardelemente. Das Ereignisgruppen-Element wird nur angezeigt, wenn `scheduler.config.event_groups` aktiviert ist. Setzen Sie `collapsed: true` für ein anfänglich eingeklapptes Panel, `position: "right"` für die rechte Seite oder `sidebar` auf `false`, um es zu deaktivieren.

Unterhalb von `overlay_width` wird das Panel nur dann zu einem geschlossenen Overlay, wenn ein sichtbares `toggle_sidebar`-Toolbar-Element verfügbar ist. Fügen Sie es einem benutzerdefinierten Header oder einer eigenständigen Toolbar hinzu. Ohne Umschalter und bei deaktivierter Toolbar bleibt das Panel angedockt.

## Sidebar-Konfiguration

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `position` | *"left" \| "right"* | Die Scheduler-Seite mit dem Panel. Standard ist `"left"`. |
| `width` | *number* | Breite der angedockten Sidebar in Pixeln. Standard ist `260`. |
| `collapsed` | *boolean* | Ob die angedockte Sidebar anfangs ausgeblendet ist. Standard ist `false`. |
| `overlay_width` | *number* | Shell-Breiten-Grenzwert, ab dem die Sidebar zum Overlay werden kann. Standard ist `768`; `0` deaktiviert den Overlay-Modus. |
| `items` | *Array* | Die von oben nach unten gerenderten integrierten und benutzerdefinierten Elemente. |

### Sidebar-Elemente

| Element | Beschreibung |
| --- | --- |
| `"minicalendar"` | Rendert einen verknüpften Mini-Kalender. Setzen Sie `mark_events: true` im Elementobjekt, um Tage mit Ereignissen zu markieren. |
| `"event_groups"` | Rendert die Ereignisgruppen-Filterliste, wenn `scheduler.config.event_groups` aktiviert ist. Das Elementobjekt akzeptiert `label` und `select_all`. |
| `{ id, css }` | Erstellt einen leeren benutzerdefinierten Container. `css` fügt Klassen hinzu; füllen Sie ihn mit `onSidebarItemRender`. |

## Benutzerdefinierte Elemente

Ein benutzerdefiniertes Sidebar-Element ist ein leerer Container. Füllen Sie ihn in `onSidebarItemRender`.

```js
scheduler.config.sidebar = { items: [{ id: "filters", css: "app-filters" }, "minicalendar"] };
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "filters") node.innerHTML = "<strong>Filters</strong>";
});
```

Verwenden Sie `scheduler.ext.sidebar.show()`, `hide()` oder `toggle()` für den Laufzeitzustand. Diese Aufrufe ändern `scheduler.config.sidebar.collapsed` nicht.

## Vorhandenes Markup

Enthält der Initialisierungs-Host Legacy-`.dhx_cal_*`-Markup, verwendet die Sidebar den permanenten Markup-Fallback. Es wird weder eine Shell noch eine Sidebar gerendert. Initialisieren Sie sie in einem leeren Host, um das Plug-in-Layout zu verwenden.

Siehe [sidebar-Konfiguration](api/config/sidebar.md) und [Anwendungslayout](guides/application-layout.md).
