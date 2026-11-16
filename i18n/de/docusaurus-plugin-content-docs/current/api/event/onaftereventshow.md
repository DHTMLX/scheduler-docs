---
sidebar_label: onAfterEventShow
title: "onAfterEventShow event"
description: "wird ausgelöst, nachdem Scheduler ein von der Methode 'showEvent' angefordertes Ereignis angezeigt hat"
---

# onAfterEventShow

### Beschreibung

@short: Wird ausgelöst, nachdem Scheduler ein von der Methode `showEvent` angefordertes Ereignis angezeigt hat

@signature: onAfterEventShow: (event: object, view: string) =\> void

### Parameter

- `event` - (erforderlich) *object* - das Ereignisobjekt
- `view` - (erforderlich) *string* - der Name der Ansicht, in der das Ereignis angezeigt wird

### Beispiel

~~~js
scheduler.attachEvent("onAfterEventShow", function(event, view){
    console.log("event is displayed in " + view);
});
~~~

### Details

Das Ereignis gehört zum Lebenszyklus von `showEvent()` und wird ausgelöst, nachdem Scheduler zur Ansicht mit dem angeforderten Ereignis gewechselt hat.

### Migration von v7.2

Dieses Ereignis ersetzt das frühere Lebenszyklusereignis `onAfterEventDisplay(event, view)`. Benennen Sie das Ereignis in `onAfterEventShow` um; die Argumente `(event, view)` bleiben unverändert.

### Verwandte API

- [showEvent](api/method/showevent.md)
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [Migration von v7.2 zu v8.0](migration.md#event-display-and-showevent-lifecycle-events)