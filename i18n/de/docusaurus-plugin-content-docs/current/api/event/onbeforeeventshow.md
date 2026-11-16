---
sidebar_label: onBeforeEventShow
title: "onBeforeEventShow event"
description: "wird ausgelöst, bevor Scheduler ein von der Methode 'showEvent' angefordertes Ereignis anzeigt"
---

# onBeforeEventShow

### Beschreibung

@short: Wird ausgelöst, bevor Scheduler ein von der Methode `showEvent` angefordertes Ereignis anzeigt

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### Parameter

- `event` - (erforderlich) *object* - das Ereignisobjekt
- `view` - (erforderlich) *string* - der Name der Ansicht, in der das Ereignis angezeigt wird

### Rückgabewert

- `result` - (boolean) - bestimmt, ob die Standardaktion ausgelöst (**true**) oder abgebrochen (**false**) wird

### Beispiel

~~~js
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### Details

Das Ereignis gehört zum Lebenszyklus von `showEvent()`. Es läuft nicht beim normalen Rendern von Ereignissen; verwenden Sie [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md), um gerenderte Ereignisse zu filtern.

### Migration von v7.2

Dieses Ereignis ersetzt das frühere Lebenszyklusereignis `onBeforeEventDisplay(event, view)`. Benennen Sie das Ereignis in `onBeforeEventShow` um; die Argumente `(event, view)` bleiben unverändert.

### Verwandte API

- [showEvent](api/method/showevent.md)
- [onAfterEventShow](api/event/onaftereventshow.md)
- [Migration von v7.2 zu v8.0](migration.md#event-display-and-showevent-lifecycle-events)