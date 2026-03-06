---
sidebar_label: "onDestroy"
title: "onDestroy event"
description: "Wird ausgelöst, sobald der Scheduler mit der Methode [destructor](api/method/destructor.md) gelöscht wurde."
---

# onDestroy

### Description

@short: Wird ausgelöst, sobald der Scheduler mit der Methode [destructor](api/method/destructor.md) gelöscht wurde.

@signature: onDestroy: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDestroy", function(){
   alert("freie benutzerdefinierte Ressourcen");
});

scheduler.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

### Change log
- hinzugefügt in v6.0
