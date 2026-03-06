---
sidebar_label: "onBeforeCollapse"
title: "onBeforeCollapse event"
description: "Срабатывает, когда пользователь нажимает на иконку сворачивания, чтобы переключить размер scheduler с «полного экрана» обратно к исходному размеру."
---

# onBeforeCollapse

### Description

@short: Срабатывает, когда пользователь нажимает на иконку сворачивания, чтобы переключить размер scheduler с «полного экрана» обратно к исходному размеру.

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    //место для вашей кастомной логики
    return true;
});
~~~

### Details

:::note
 Это событие требует активного расширения [expand](guides/extensions-list.md#expand). 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
