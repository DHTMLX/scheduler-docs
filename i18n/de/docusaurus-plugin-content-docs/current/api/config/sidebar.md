---
sidebar_label: sidebar
title: "sidebar-Konfiguration"
description: "konfiguriert das Scheduler-Sidebar-Plug-in"
---

# sidebar

### Beschreibung

@short: Konfiguriert das Scheduler-Sidebar-Plug-in

@signature: sidebar: SidebarConfig | false

### Beispiel

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

### Details

Aktivieren Sie `sidebar: true` vor `init()`. Wenn diese Konfiguration fehlt, verwendet die Sidebar `minicalendar` und, sofern Ereignisgruppen konfiguriert sind, `event_groups`. Die Standardwerte sind `position: "left"`, `width: 260`, `collapsed: false` und `overlay_width: 768`.

`items` enthält integrierte IDs oder benutzerdefinierte Elemente vom Typ `{ id, css }`. Ein benutzerdefiniertes Element ist ein leerer Knoten, der über `onSidebarItemRender` bereitgestellt wird. Das integrierte Ereignisgruppen-Element akzeptiert Überschreibungen für `label` und `select_all`.

Unterhalb von `overlay_width` wird die Sidebar nur dann zu einem geschlossenen Overlay, wenn ein sichtbares `toggle_sidebar`-Element in einer Toolbar gerendert wird. Ohne dieses Steuerelement bleibt das Panel angedockt. `collapsed` bezeichnet den anfänglichen angedockten Zustand; Laufzeitaufrufe von `scheduler.ext.sidebar` schreiben ihn nicht in diese Konfiguration zurück. Setzen Sie `sidebar` auf `false`, um den Bereich auszublenden.

### Verwandte API

- [sidebar](api/other/sidebar.md)
- [header](api/config/header.md)

### Verwandte Anleitungen

- [Sidebar](guides/sidebar.md)
- [Anwendungslayout](guides/application-layout.md)