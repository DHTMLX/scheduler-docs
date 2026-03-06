---
sidebar_label: "plugins"
title: "plugins method"
description: "선택한 extensions를 활성화합니다."
---

# plugins

### Description

@short: 선택한 extensions를 활성화합니다.

@signature: plugins: (ext: any) =\> void

### Parameters

- `ext` - (required) *object* - 활성화할 extensions

### Example

~~~jsx
scheduler.plugins({
   agenda_view: true,
   daytimeline: true
});
~~~

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md)

### Change log
- v6.0에 추가됨
