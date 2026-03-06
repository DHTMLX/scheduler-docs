---
sidebar_label: "assert"
title: "assert method"
description: "Falls der angegebene Ausdruck false ist, erscheint eine Fehlermeldung in einem roten Popup oben rechts auf dem Bildschirm."
---

# assert

### Description

@short: Falls der angegebene Ausdruck false ist, erscheint eine Fehlermeldung in einem roten Popup oben rechts auf dem Bildschirm.

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - true, um den Ausdruck zu bestätigen, false - wenn die Assertion fehlschlägt
- `errorMessage` - (required) *string* - die Fehlermeldung, die in einem roten Popup angezeigt wird

### Example

~~~jsx
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});
~~~

### Details

Innerhalb des dhtmlxScheduler-Codebases wird **scheduler.assert()** verwendet, um zu erkennen, wenn die Komponente sich in einem ungültigen Zustand befindet.

Sie können anpassen, wie Fehler angezeigt werden, indem Sie die [show_errors](api/config/show_errors.md) Konfiguration verwenden.

Fehler können auch programmatisch über das [onError](api/event/onerror.md) Event überwacht werden.

### Change log
- hinzugefügt in v6.0
