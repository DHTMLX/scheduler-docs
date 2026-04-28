---
sidebar_label: onBeforeExpand
title: "Событие onBeforeExpand"
description: "срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер расписания с исходного на 'полный экран'."
---

# onBeforeExpand

### Description

@short: Срабатывает, когда пользователь нажимает на значок разворачивания, чтобы изменить размер расписания с исходного на 'полный экран'.

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Событие требует включенного плагина [expand](guides/extensions-list.md#expand). 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)