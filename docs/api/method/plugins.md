---
sidebar_label: plugins
title: "plugins method"
description: "activates the specified extensions"
---

# plugins

### Description

@short: Activates the specified extensions

@signature: plugins: (ext: any) =\> void

### Parameters

- `ext` - (required) *object* - extensions that need to be activated

### Example

~~~jsx
scheduler.plugins({
   agenda_view: true,
   daytimeline: true
});
~~~

### Related Guides
- [Full List of Extensions](guides/extensions-list.md)

### Change log
- added in v6.0
