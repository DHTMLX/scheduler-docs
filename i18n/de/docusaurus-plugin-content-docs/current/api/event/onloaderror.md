---
sidebar_label: "onLoadError"
title: "onLoadError event"
description: "Wird ausgelöst, wenn der Scheduler Daten nicht parsen kann oder wenn der Server mit einem 4xx- oder 5xx-Statuscode antwortet."
---

# onLoadError

### Description

@short: Wird ausgelöst, wenn der Scheduler Daten nicht parsen kann oder wenn der Server mit einem 4xx- oder 5xx-Statuscode antwortet.

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - ein Ajax-Request-Objekt

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("Daten konnten nicht geladen werden");
});
~~~

### Details

Dieses Event wird von den Methoden [parse](api/method/parse.md) und [load](api/method/load.md) aufgerufen.

Wenn es durch die **parse**-Methode ausgelöst wird, erhält die Handler-Funktion ein Objekt mit einer *responseText*-Eigenschaft, die die zu parsenden Daten enthält:

~~~js
{
    responseText: parseArgument
}
~~~
