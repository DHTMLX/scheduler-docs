---
sidebar_label: sidebar
title: "sidebar-API"
description: "bietet Laufzeitzugriff auf das Sidebar-Plug-in"
---

# sidebar

### Beschreibung

@short: Bietet Laufzeitzugriff auf das Sidebar-Plug-in

@signature: scheduler.ext.sidebar: SidebarApi

### Beispiel

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.init("scheduler_here");
scheduler.ext.sidebar.toggle();
~~~

### Details

Die API ist nach `scheduler.plugins({ sidebar: true })` verfügbar. `show()`, `hide()` und `toggle()` ändern das gerenderte Panel. `isCollapsed()` meldet den sichtbaren Zustand und `isOverlay()`, ob die Sidebar derzeit ein Overlay ist. `refresh()` liest `scheduler.config.sidebar` erneut; `getItemNode(id)` gibt einen Elementknoten oder `null` zurück; `getDefaultItems()` gibt die Standard-Element-IDs zurück.

### Verwandte Anleitungen

- [Sidebar](guides/sidebar.md)