---
sidebar_label: toolbar
title: "toolbar-API"
description: "bietet Laufzeitzugriff auf das Toolbar-Plug-in"
---

# toolbar

### Beschreibung

@short: Bietet Laufzeitzugriff auf das Toolbar-Plug-in

@signature: scheduler.ext.toolbar: ToolbarApi

### Beispiel

~~~jsx
scheduler.plugins({ toolbar: true });
scheduler.init("scheduler_here");

scheduler.ext.toolbar.updateItem("today", { hidden: true });
~~~

### Details

Diese API ist nach `scheduler.plugins({ toolbar: true })` und `scheduler.init()` verfügbar. Sie arbeitet mit der gerenderten Toolbar, ohne `scheduler.config.header` zu ändern.

| Methode | Beschreibung |
| --- | --- |
| `setItems(items)` | Ersetzt die Laufzeit-Elementstruktur, bis sich der deklarative Header ändert. |
| `updateItem(id, patch, occurrence?)` | Wendet einen Patch auf ein Element an. |
| `getItem(id, occurrence?)` | Gibt eine Kopie der Elementkonfiguration oder `null` zurück. |
| `getValue(id, occurrence?)` | Gibt den aktuellen Wert eines werttragenden Elements zurück. |
| `setValue(id, value, occurrence?)` | Setzt einen Wert, ohne ein Änderungsereignis auszulösen. |
| `show(id, occurrence?)` / `hide(id, occurrence?)` | Zeigt ein Element an oder blendet es aus. |
| `refresh()` | Liest die aktuelle Headerkonfiguration erneut und aktualisiert den Toolbar-Zustand. |
| `getItemNode(id, occurrence?)` | Gibt das Wurzelelement eines Elements oder `null` zurück. |
| `getDefaultItems()` | Gibt die erzeugte Standard-Elementliste zurück. |

`occurrence` ist eine nullbasierte Position für eine wiederholte ID in visueller Tiefensuche-Reihenfolge; lassen Sie den Wert für das erste Element weg. Numerische und Zeichenkettenformen derselben ID werden als eine ID behandelt.

### Verwandte Anleitungen

- [Toolbar](guides/toolbar.md)
- [header](api/config/header.md)