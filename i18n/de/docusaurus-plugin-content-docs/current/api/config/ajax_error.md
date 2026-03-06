---
sidebar_label: "ajax_error"
title: "ajax_error config"
description: "definiert, wie die Standard-Fehlermeldung angezeigt wird, wenn das Laden von XML-Daten fehlschlägt"
---

# ajax_error

### Description

@short: Definiert, wie die Standard-Fehlermeldung angezeigt wird, wenn das Laden von XML-Daten fehlschlägt

@signature: ajax_error: string | boolean

### Example

~~~jsx
// gibt Fehlermeldung in der Konsole aus
scheduler.config.ajax_error = "console";

// oder
// deaktiviert die Standard-Fehlermeldungen
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");
~~~

**Default value:** "alert"

### Details

Standardmäßig sieht die Fehlermeldung (wenn <code>scheduler.config.ajax_error = "alert"</code>) so aus:

![ajax_error_property](/img/ajax_error_property.png)
