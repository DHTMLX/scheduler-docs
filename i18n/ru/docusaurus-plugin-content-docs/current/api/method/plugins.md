---
sidebar_label: "plugins"
title: "plugins method"
description: "включает выбранные расширения"
---

# plugins

### Description

@short: Включает выбранные расширения

@signature: plugins: (ext: any) =\> void

### Parameters

- `ext` - (required) *object* - расширения, которые необходимо включить

### Example

~~~jsx
scheduler.plugins({
   agenda_view: true,
   daytimeline: true
});
~~~

### Related Guides
- [Полный список расширений](guides/extensions-list.md)

### Change log
- добавлено в v6.0
