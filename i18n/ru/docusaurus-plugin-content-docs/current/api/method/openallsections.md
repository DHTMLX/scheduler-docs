---
sidebar_label: openAllSections
title: "openAllSections method"
description: "Открывает все разделы в текущем активном представлении (если открытое представление не Timeline в режиме 'Tree' - метод будет проигнорирован)"
---

# openAllSections

### Description

@short: Открывает все разделы в текущем активном представлении (если открытое представление не Timeline в режиме 'Tree' - метод будет проигнорирован)

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активированного плагина [treetimeline](guides/extensions-list.md#treetimeline).
 :::

:::note
Метод используется только для режима 'Tree'
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)