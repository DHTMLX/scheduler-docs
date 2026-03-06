---
sidebar_label: "onBeforeExpand"
title: "onBeforeExpand event"
description: "срабатывает, когда пользователь нажимает на иконку расширения, чтобы переключить scheduler из исходного размера в режим 'полного экрана'."
---

# onBeforeExpand

### Description

@short: Срабатывает, когда пользователь нажимает на иконку расширения, чтобы переключить scheduler из исходного размера в режим "полного экрана".

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

:::note
 Для работы события требуется включенный плагин [expand](guides/extensions-list.md#expand). 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
