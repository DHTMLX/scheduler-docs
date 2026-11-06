---
sidebar_label: onToolbarItemChange
title: "onToolbarItemChange-Ereignis"
description: "wird ausgelöst, wenn sich ein Wert-Element der Toolbar ändert"
---

# onToolbarItemChange

### Beschreibung

@short: Wird ausgelöst, wenn sich ein Wert-Element der Toolbar ändert

@signature: onToolbarItemChange: (id: string | number, value: any, item: object) =\> boolean

### Parameter

- `id` - (erforderlich) *string | number* - die Element-ID
- `value` - (erforderlich) *any* - der neu ausgewählte Wert
- `item` - (erforderlich) *object* - eine Kopie der Elementkonfiguration; die Eigenschaft `occurrence` kennzeichnet eine wiederholte ID

### Rückgabewert

- `result` - (boolean) - geben Sie `false` zurück, um den vorherigen Wert wiederherzustellen und die Aktion abzubrechen

### Beispiel

~~~jsx
scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "views" && value === "month" && !canOpenMonth()) return false;
    return true;
});
~~~

### Details

Benötigt das [Toolbar](guides/toolbar.md)-Plug-in. Dieses Ereignis wird von Wert-Steuerelementen wie `combo`, `segmented` und einem segmentierten `views`-Element verwendet. Gibt es `false` zurück, stellt die gemeinsame Toolbar den zuletzt akzeptierten Wert wieder her.

### Verwandte Anleitungen

- [Toolbar](guides/toolbar.md)