---
sidebar_label: "onSaveError"
title: "onSaveError event"
description: "Wird ausgelöst, wenn beim Aktualisieren von Daten ein Fehler auftritt"
---

# onSaveError

### Description

@short: Wird ausgelöst, wenn beim Aktualisieren von Daten ein Fehler auftritt

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - ein Array mit den IDs der Ereignisse, die nicht aktualisiert werden konnten
- `response` - (required) *XMLHttpRequest* - das Ajax-Request-Objekt

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("Failed to  update data");
})
~~~

### Details

:::note

Dieses Event wird nur ausgelöst, wenn die dataProcessor-Bibliothek für die Client-Server-Kommunikation verwendet wird.
 
:::
