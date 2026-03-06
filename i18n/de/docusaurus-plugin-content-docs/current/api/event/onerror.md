---
sidebar_label: "onError"
title: "onError event"
description: "Löst aus, wenn [assert](api/method/assert.md) den Wert 'false' erhält, was bedeutet, dass eine Assertion fehlgeschlagen ist."
---

# onError

### Description

@short: Löst aus, wenn [assert](api/method/assert.md) den Wert 'false' erhält, was bedeutet, dass eine Assertion fehlgeschlagen ist.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - ein String, der die Fehlermeldung aus der [assert](api/method/assert.md) Methode enthält

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onError", function(errorMessage){
    scheduler.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird das Standardverhalten gestoppt, welches darin besteht, die Fehlermeldung in einem roten Kasten oben rechts anzuzeigen.

### Change log
- hinzugefügt in Version 6.0
