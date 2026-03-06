---
sidebar_label: "plugins"
title: "plugins method"
description: "aktiviert die ausgewählten Extensions"
---

# plugins

### Description

@short: Aktiviert die ausgewählten Extensions

@signature: plugins: (ext: any) =\> void

### Parameters

- `ext` - (required) *object* - zu aktivierende Extensions

### Example

~~~jsx
scheduler.plugins({
   agenda_view: true,
   daytimeline: true
});
~~~

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md)

### Change log
- hinzugefügt in v6.0
