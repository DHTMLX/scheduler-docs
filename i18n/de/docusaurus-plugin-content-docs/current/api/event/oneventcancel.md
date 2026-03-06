---
sidebar_label: "onEventCancel"
title: "onEventCancel event"
description: "Wird ausgelöst, wenn der Benutzer im Lightbox-Formular (Editierformular) auf die Schaltfläche 'Abbrechen' klickt."
---

# onEventCancel

### Description

@short: Wird ausgelöst, wenn der Benutzer im Lightbox-Formular (Editierformular) auf die Schaltfläche „Abbrechen" klickt.

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `flag` - (required) *boolean* - zeigt „true" an, wenn der Benutzer das Erstellen eines neuen Events abbricht,<br> „false", wenn das bearbeitete Event bereits existiert

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    //beliebige benutzerdefinierte Logik hier
});
~~~
