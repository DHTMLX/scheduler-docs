---
sidebar_label: onLayoutSizeChange
title: "onLayoutSizeChange-Ereignis"
description: Wird ausgelöst, wenn sich die sichtbare Scheduler-Layoutgröße ändert
---

# onLayoutSizeChange

### Beschreibung

@short: Wird ausgelöst, wenn sich die Größe der sichtbaren Layout-Shell ändert

@signature: onLayoutSizeChange: (size: LayoutSize) => void

### Parameter

- `size` - (erforderlich) *LayoutSize* - die Shell-Größe als `{ width, height }` in ganzzahligen Pixeln

### Beispiel

~~~js
scheduler.attachEvent("onLayoutSizeChange", size => {
  scheduler.config.header = size.width < 600 ? compactHeader : wideHeader;
});
~~~

### Details

Wird im sichtbaren Toolbar- oder Sidebar-Shell-Modus ausgelöst, wenn sich `clientWidth` oder `clientHeight` ändert. Es empfängt `{ width, height }` vor der Abstimmung des Toolbar-Headers, sodass ein Handler im selben Rendervorgang einen responsiven Header auswählen kann.

Siehe [Mobiler responsiver Scheduler](guides/touch-support.md).
