---
sidebar_label: "onCollapse"
title: "onCollapse event"
description: "срабатывает, когда пользователь нажимает на иконку разворачивания, чтобы переключить scheduler из режима 'полного экрана' обратно к исходному размеру."
---

# onCollapse

### Description

@short: Срабатывает, когда пользователь нажимает на иконку разворачивания, чтобы переключить scheduler из режима "полного экрана" обратно к исходному размеру.

@signature: onCollapse: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    //любая ваша логика здесь
});
~~~

### Details

:::note
 Событие требует включенного расширения [expand](guides/extensions-list.md#expand). 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
