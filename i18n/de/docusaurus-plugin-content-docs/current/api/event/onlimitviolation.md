---
sidebar_label: "onLimitViolation"
title: "onLimitViolation event"
description: "Wird ausgelöst, wenn ein Benutzer versucht, einem Ereignis eine Zeit zuzuweisen, die derzeit eingeschränkt oder blockiert ist"
---

# onLimitViolation

### Description

@short: Wird ausgelöst, wenn ein Benutzer versucht, einem Ereignis eine Zeit zuzuweisen, die derzeit eingeschränkt oder blockiert ist

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Ereignisses
- `obj` - (required) *object* - das Ereignisobjekt

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird ausgelöst, sobald ein Benutzer versucht, die Zeit eines Ereignisses auf einen Zeitraum festzulegen, der eingeschränkt oder blockiert ist. Diese Einschränkungen können konfiguriert werden über:

- die Optionen [limit_start](api/config/limit_start.md) und [limit_end](api/config/limit_end.md)
- die Methode [addMarkedTimespan](api/method/addmarkedtimespan.md)

:::note

Wenn dieser Event-Handler 'true' zurückgibt, wird die Einschränkung umgangen und das Ereignis kann der eigentlich nicht erlaubten Zeit zugewiesen werden.
 
:::
