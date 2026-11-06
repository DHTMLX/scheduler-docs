---
sidebar_label: onToolbarItemClick
title: "onToolbarItemClick-Ereignis"
description: "wird ausgelöst, wenn ein Toolbar-Element aktiviert wird"
---

# onToolbarItemClick

### Beschreibung

@short: Wird ausgelöst, wenn ein Toolbar-Element aktiviert wird

@signature: onToolbarItemClick: (id: string | number, item: object, event: Event | null) =\> boolean

### Parameter

- `id` - (erforderlich) *string | number* - die Element-ID
- `item` - (erforderlich) *object* - eine Kopie der Elementkonfiguration; die Eigenschaft `occurrence` kennzeichnet eine wiederholte ID
- `event` - (erforderlich) *Event | null* - das native Klickereignis oder `null` bei Aktivierung über Tastatur/Touch

### Rückgabewert

- `result` - (boolean) - geben Sie `false` zurück, um die integrierte Aktion oder den Ansichtswechsel abzubrechen

### Beispiel

~~~jsx
scheduler.attachEvent("onToolbarItemClick", (id, item, event) => {
    if (id === "add_event" && scheduler.config.readonly) return false;
    return true;
});
~~~

### Details

Benötigt das [Toolbar](guides/toolbar.md)-Plug-in. Das Ereignis wird nach einem `click`-Callback eines Legacy-Elements und vor der integrierten Toolbar- oder Ansichtsaktion ausgelöst. Die Rückgabe von `false` macht den Legacy-Callback nicht rückgängig, verhindert jedoch die nachfolgende Scheduler-Aktion. Ansichtsregisterkarten und ein `views`-Menü melden den ausgewählten Ansichtsnamen als `id`.

### Verwandte Anleitungen

- [Toolbar](guides/toolbar.md)