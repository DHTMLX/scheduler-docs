---
sidebar_label: closeAllSections
title: "closeAllSections method"
description: "закрывает все разделы в текущем активном виде"
---

# closeAllSections
:::info
 Эта функциональность доступна только в PRO-версии. 
:::
### Description

@short: Закрывает все разделы в текущем активном виде

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активированного плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если открытый вид не является Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)