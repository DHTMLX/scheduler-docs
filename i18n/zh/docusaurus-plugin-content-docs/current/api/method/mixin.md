---
sidebar_label: "mixin"
title: "mixin method"
description: "将 'source' 对象的属性合并到 'target' 对象中"
---

# mixin

### Description

@short: 将 'source' 对象的属性合并到 'target' 对象中

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - 将接收新属性的对象
- `source` - (required) *object* - 提供要添加属性的对象
- `force` - (required) *boolean* - 当为 true 时，'source' 的属性将替换 'target' 中已有的属性；当为 false 时，保留 'target' 中已有的属性

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- 版本 6.0 中新增
