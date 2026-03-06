---
sidebar_label: "onExpand"
title: "onExpand event"
description: "Срабатывает, когда пользователь нажимает на иконку разворачивания, чтобы изменить размер планировщика с исходного состояния на «полный экран»."
---

# onExpand

### Description

@short: Срабатывает, когда пользователь нажимает на иконку разворачивания, чтобы изменить размер планировщика с исходного состояния на «полный экран».

@signature: onExpand: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    //любая пользовательская логика здесь
});
~~~

### Details

:::note
 Для срабатывания этого события необходимо включить расширение [expand](guides/extensions-list.md#expand). 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
