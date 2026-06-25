---
sidebar_label: onBeforeCollapse
title: "onBeforeCollapse event"
description: "Срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер планировщика с 'полноэкранного' на исходный."
---

# onBeforeCollapse

### Description

@short: Срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер планировщика с 'полноэкранного' на исходный.

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Событие требует, чтобы расширение [expand](guides/extensions-list.md#expand) было включено.
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)