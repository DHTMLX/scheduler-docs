---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "filtert Ereignisse vor dem Rendern"
---

# onBeforeEventDisplay

### Beschreibung

@short: Wird vor dem Rendern eines Ereignisses ausgelöst und kann dessen Anzeige verhindern

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

### Parameter

- `id` - (erforderlich) *string | number* - die Ereignis-ID
- `event` - (erforderlich) *object* - das Ereignisobjekt

### Rückgabewert
- `result` - (boolean) - bestimmt, ob die Standardaktion ausgelöst (**true**) oder abgebrochen (**false**) wird

### Beispiel

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){
    return event.priority !== "low";
});
~~~

### Details

Das Ereignis wird für jedes zum Rendern berücksichtigte Ereignis ausgelöst, einschließlich wiederkehrender Vorkommen und Ereignisse für Mini-Kalender-Markierungen. Es läuft zusätzlich zur Funktion `filter_<view>` der aktuellen Ansicht.

Sie können mehrere `onBeforeEventDisplay`-Handler anhängen. Ein Ereignis wird nur angezeigt, wenn der Ansichtsfilter und alle Handler `true` zurückgeben. Das Entfernen eines Handlers beeinflusst die anderen nicht.

### Migration von v7.2

In v7.2 gehörte `onBeforeEventDisplay(event, view)` zum Lebenszyklus von `showEvent()`. Verwenden Sie in v8.0 dafür [onBeforeEventShow](api/event/onbeforeeventshow.md). Das v8.0-Ereignis `onBeforeEventDisplay` ist das auf dieser Seite beschriebene Render-Prädikat und empfängt `(id, event)`.

### Verwandte API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)