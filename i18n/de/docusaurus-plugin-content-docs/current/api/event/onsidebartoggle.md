---
sidebar_label: onSidebarToggle
title: "onSidebarToggle-Ereignis"
description: "wird ausgelöst, wenn sich der sichtbare Zustand der Sidebar ändert"
---

# onSidebarToggle

### Beschreibung

@short: Wird ausgelöst, wenn sich der sichtbare Zustand der Sidebar ändert

@signature: onSidebarToggle: (collapsed: boolean, overlay: boolean) => void

### Parameter

- `collapsed` - (erforderlich) *boolean* - ob die Sidebar ausgeblendet ist
- `overlay` - (erforderlich) *boolean* - ob die Sidebar als Overlay arbeitet

### Beispiel

~~~js
scheduler.attachEvent("onSidebarToggle", (collapsed, overlay) => {
    console.log(collapsed ? "Sidebar closed" : overlay ? "Sidebar opened as an overlay" : "Sidebar opened");
});
~~~

### Details

Das Ereignis wird nach `show()`, `hide()`, `toggle()` und einer Änderung des responsiven Modus ausgelöst, wenn sich der sichtbare Zustand ändert. Es benötigt das Sidebar-Plug-in.