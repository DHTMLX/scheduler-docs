---
sidebar_label: onCollapse
title: "onCollapse событие"
description: "срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер планировщика с 'полного экрана' на исходный."
---

# onCollapse

### Description

@short: Срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер планировщика с 'полного экрана' на исходный.

@signature: onCollapse: () => void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    // любая ваша логика здесь
});
~~~

### Details

:::note
 Это событие требует включённого расширения [expand](guides/extensions-list.md#expand).
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)