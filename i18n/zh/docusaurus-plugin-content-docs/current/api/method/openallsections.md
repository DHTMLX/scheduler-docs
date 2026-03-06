---
sidebar_label: "openAllSections"
title: "openAllSections method"
description: "打开当前活动视图中的所有 section（仅当视图为 Timeline 且处于'Tree'模式时有效；否则，该方法将被忽略）"
---

# openAllSections

### Description

@short: 打开当前活动视图中的所有 section（仅当视图为 Timeline 且处于"Tree"模式时有效；否则，该方法将被忽略）

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 此方法需要启用 [treetimeline](guides/extensions-list.md#treetimeline) 插件。 
:::

:::note

此方法仅适用于 Tree 模式
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)
