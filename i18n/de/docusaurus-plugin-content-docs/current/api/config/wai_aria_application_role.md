---
sidebar_label: "wai_aria_application_role"
title: "wai_aria_application_role config"
description: "gibt an, ob role='application' dem Haupt-Container des Schedulers und den Minikalender-Elementen zugewiesen werden soll"
---

# wai_aria_application_role

### Description

@short: Gibt an, ob role="application" dem Haupt-Container des Schedulers und den Minikalender-Elementen zugewiesen werden soll

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

hinzugefügt in Version 5.0

Steuert, wie Screenreader die Scheduler-Oberfläche verarbeiten.

### Related Guides
- [Barrierefreiheit](guides/accessibility.md)
