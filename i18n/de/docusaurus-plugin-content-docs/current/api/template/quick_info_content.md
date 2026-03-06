---
sidebar_label: "quick_info_content"
title: "quick_info_content template"
description: "definiert, was im Pop-up-Bearbeitungsformular angezeigt wird"
---

# quick_info_content

### Description

@short: Definiert, was im Pop-up-Bearbeitungsformular angezeigt wird

@signature: quick_info_content: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - der Zeitpunkt, an dem das Ereignis beginnt
- `end` - (required) *Date* - der Zeitpunkt, an dem das Ereignis endet
- `event` - (required) *object* - das Ereignisobjekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.quick_info_content = function(start, end, ev){ 
       return ev.details || ev.text;
};
~~~

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#touch-support)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
