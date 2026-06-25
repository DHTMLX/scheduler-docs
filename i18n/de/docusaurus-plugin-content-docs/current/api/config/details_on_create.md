---
sidebar_label: "details_on_create"
title: "details_on_create config"
description: "Ermöglicht die Verwendung des erweiterten Formulars beim Erstellen neuer Events durch Drag & Drop oder Doppelklick."
---

# details_on_create

### Description

@short: Ermöglicht die Verwendung des erweiterten Formulars beim Erstellen neuer Events durch Drag & Drop oder Doppelklick.

@signature: details_on_create: boolean

### Example

~~~jsx
scheduler.config.details_on_create=true;
...
scheduler.init('scheduler_here', new Date(2027,0,10), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Change log
- Der Standardwert wurde ab Version 7.0 auf `true` geändert
