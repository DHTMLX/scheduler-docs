---
sidebar_label: "readonly_form"
title: "readonly_form config"
description: "включает режим только для чтения для лайтбокса"
---

# readonly_form

### Description

@short: Включает режим только для чтения для лайтбокса

@signature: readonly_form: boolean

### Example

~~~jsx
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"month");
~~~

**Default value:** false

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

:::note
 Это свойство требует активного плагина [readonly](guides/extensions-list.md#readonly). 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Режим только для чтения](guides/readonly.md)
