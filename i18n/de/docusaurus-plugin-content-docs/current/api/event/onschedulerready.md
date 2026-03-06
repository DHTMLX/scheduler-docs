---
sidebar_label: "onSchedulerReady"
title: "onSchedulerReady event"
description: "Wird ausgelöst, sobald der Scheduler die Initialisierung abgeschlossen hat, obwohl er noch nicht auf der Seite angezeigt wird."
---

# onSchedulerReady

### Description

@short: Wird ausgelöst, sobald der Scheduler die Initialisierung abgeschlossen hat, obwohl er noch nicht auf der Seite angezeigt wird.

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    //any custom logic here
});
~~~
