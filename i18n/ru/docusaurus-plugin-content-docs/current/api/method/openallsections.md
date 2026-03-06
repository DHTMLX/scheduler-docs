---
sidebar_label: "openAllSections"
title: "openAllSections method"
description: "открывает все секции в текущем активном представлении (работает только если представление - Timeline в режиме 'Tree'; в противном случае метод игнорируется)"
---

# openAllSections

### Description

@short: Открывает все секции в текущем активном представлении (работает только если представление - Timeline в режиме 'Tree'; в противном случае метод игнорируется)

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот метод требует включения плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Данный метод применяется исключительно в режиме Tree
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)
