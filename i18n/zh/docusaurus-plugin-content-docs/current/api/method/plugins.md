---
sidebar_label: "plugins"
title: "plugins method"
description: "启用所选的 extensions"
---

# plugins

### Description

@short: 启用所选的 extensions

@signature: plugins: (ext: any) =\> void

### Parameters

- `ext` - (required) *object* - 需要启用的 extensions

### Example

~~~jsx
scheduler.plugins({
   agenda_view: true,
   daytimeline: true
});
~~~

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md)

### Change log
- added in v6.0
