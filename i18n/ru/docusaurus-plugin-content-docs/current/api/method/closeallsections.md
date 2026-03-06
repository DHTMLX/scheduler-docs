---
sidebar_label: "closeAllSections"
title: "closeAllSections method"
description: "закрывает все секции в текущем активном вью"
---

# closeAllSections
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Закрывает все секции в текущем активном вью

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод работает только если включён плагин [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если активный вью не является Timeline в режиме 'Tree', этот метод не будет иметь эффекта.
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)
