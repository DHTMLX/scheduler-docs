---
sidebar_label: onSidebarItemRender
title: "onSidebarItemRender-Ereignis"
description: "wird ausgelöst, wenn ein benutzerdefiniertes Sidebar-Element eingehängt wird"
---

# onSidebarItemRender

### Beschreibung

@short: Wird ausgelöst, wenn ein benutzerdefiniertes Sidebar-Element eingehängt wird

@signature: onSidebarItemRender: (id: string, node: HTMLElement) => void

### Parameter

- `id` - (erforderlich) *string* - die ID des benutzerdefinierten Elements
- `node` - (erforderlich) *HTMLElement* - der leere Elementcontainer

### Beispiel

~~~js
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
    if (id === "summary") node.textContent = "Upcoming events";
});
~~~

### Details

Das Ereignis wird für benutzerdefinierte Sidebar-Elemente vom Typ `{ id }` ausgelöst. Die integrierten Elemente `minicalendar` und `event_groups` verwalten ihre Inhalte selbst.