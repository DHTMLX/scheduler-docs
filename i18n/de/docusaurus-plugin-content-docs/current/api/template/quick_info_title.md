---
sidebar_label: "quick_info_title"
title: "quick_info_title template"
description: "Legt den Titel für das Pop-up-Bearbeitungsformular fest"
---

# quick_info_title

### Description

@short: Legt den Titel für das Pop-up-Bearbeitungsformular fest

@signature: quick_info_title: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Startdatum des Events
- `end` - (required) *Date* - Das Enddatum des Events
- `event` - (required) *object* - Das Event-Objekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};
~~~

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#touch-support)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
