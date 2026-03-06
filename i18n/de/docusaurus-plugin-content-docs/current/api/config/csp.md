---
sidebar_label: "csp"
title: "csp config"
description: "gibt an, wie die Methoden zur Datumsformatierung intern implementiert werden"
---

# csp

### Description

@short: Gibt an, wie die Methoden zur Datumsformatierung intern implementiert werden

@signature: csp: boolean | string

### Example

~~~jsx
scheduler.config.csp = true;
...
scheduler.init("gantt_here");
~~~

**Default value:** "auto"

### Details

Einige Laufzeitumgebungen, wie Salesforce Lightning, können verhindern, dass der Code von dhtmlxScheduler ordnungsgemäß ausgeführt wird. Dies geschieht meist aufgrund der Content Security Policy (CSP), die in der App festgelegt ist.

Die CSP kann die Art und Weise, wie Scheduler seine Methoden zur Datumsformatierung intern ausführt, als unsicher einstufen.

Die **csp**-Konfiguration hilft dabei, zu verhindern, dass der Scheduler-Code blockiert wird, indem sie Ihnen erlaubt, auszuwählen, wie diese Methoden implementiert werden.

Es gibt drei Modi, wie **scheduler.date.date_to_str** und **scheduler.date.str_to_date** intern arbeiten:

- Standardmäßig ist der Wert auf *auto* gesetzt.

~~~js
scheduler.config.csp = "auto";
~~~

In diesem Modus versucht Scheduler, den schnellstmöglichen Code für die Datumsformatierung zu verwenden. Wenn dies durch die Einstellungen der App nicht erlaubt ist, wird auf eine kompatible Version zurückgegriffen.

- Sie können den Scheduler zwingen, immer den kompatiblen Code zu verwenden, indem Sie ihn auf *true* setzen.

~~~js
scheduler.config.csp = true;
~~~

Dies garantiert, dass der Code überall ausgeführt wird, obwohl er möglicherweise langsamer läuft.

- Oder Sie setzen ihn auf *false*, um immer den Hochleistungs-Code zu verwenden.

~~~js
scheduler.config.csp = false;
~~~

Beachten Sie, dass wenn die App diesen Hochleistungs-Code blockiert, dhtmlxScheduler nicht mehr funktioniert.

### Change log
- hinzugefügt in v6.0
