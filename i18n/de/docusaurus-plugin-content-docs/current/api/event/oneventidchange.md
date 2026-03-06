---
sidebar_label: "onEventIdChange"
title: "onEventIdChange event"
description: "Wird ausgelöst, wenn die ID eines Events aktualisiert wird"
---

# onEventIdChange

### Description

@short: Wird ausgelöst, wenn die ID eines Events aktualisiert wird

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - die ursprüngliche ID des Events    
- `new_id` - (required) *string* - die aktualisierte ID des Events

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event tritt typischerweise auf, nachdem die Einfügeoperation bestätigt wurde und die clientseitige ID auf die Datenbank-ID umgestellt wird.
