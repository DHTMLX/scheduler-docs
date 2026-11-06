---
sidebar_label: getLayoutSize
title: "getLayoutSize-Methode"
description: Gibt die Größe des sichtbaren Scheduler-Layouts zurück
---

# getLayoutSize

### Beschreibung

@short: Gibt die Größe der sichtbaren Layout-Shell zurück

@signature: getLayoutSize(): LayoutSize | null

### Rückgabewert

- `size` - (LayoutSize | null) - die sichtbare Shell-Größe als `{ width, height }` oder `null`, wenn keine sichtbare Layout-Shell vorhanden ist

### Beispiel

~~~js
const size = scheduler.getLayoutSize();
if (size && size.width < 600) {
  scheduler.config.header = compactHeader;
}
~~~

### Details

Gibt `{ width, height }` zurück, gemessen anhand der ganzzahligen `clientWidth` und `clientHeight` der Shell. Die Methode ist verfügbar, wenn Toolbar oder Sidebar eine sichtbare Shell erstellt, und gibt `null` zurück, wenn kein Layout-Plug-in aktiv oder die Shell getrennt bzw. ausgeblendet ist.

Siehe [Toolbar](guides/toolbar.md) und [Sidebar](guides/sidebar.md).
