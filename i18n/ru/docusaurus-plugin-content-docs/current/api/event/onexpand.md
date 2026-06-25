---
sidebar_label: onExpand
title: "onExpand событие"
description: "Срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер планировщика с исходного на 'полный экран'."
---

# onExpand

### Description

@short: Срабатывает, когда пользователь кликает по значку разворачивания, чтобы изменить размер планировщика с исходного на 'полный экран'.

@signature: onExpand: () => void


### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    // любая ваша логика здесь
});
~~~

### Details

:::note
 Это событие требует включённого расширения [expand](guides/extensions-list.md#expand) для включения.
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)