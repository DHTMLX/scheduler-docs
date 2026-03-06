---
sidebar_label: "closeAllSections"
title: "closeAllSections method"
description: "关闭当前活动视图中的所有 sections"
---

# closeAllSections
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 关闭当前活动视图中的所有 sections

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该方法仅在启用了 [treetimeline](guides/extensions-list.md#treetimeline) 插件时有效。 
:::

:::note

如果当前活动视图不是"树状"模式的 Timeline，该方法将不会生效。
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)
