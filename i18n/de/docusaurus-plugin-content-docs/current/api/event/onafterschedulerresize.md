---
sidebar_label: "onAfterSchedulerResize"
title: "onAfterSchedulerResize event"
description: "Wird ausgelöst, sobald die Größe des Schedulers aktualisiert und der Datenbereich neu gezeichnet wurde."
---

# onAfterSchedulerResize

### Description

@short: Wird ausgelöst, sobald die Größe des Schedulers aktualisiert und der Datenbereich neu gezeichnet wurde.

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    // beliebige benutzerdefinierte Logik hier
});
~~~
