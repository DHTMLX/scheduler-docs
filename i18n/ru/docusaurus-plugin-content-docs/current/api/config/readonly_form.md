--- 
sidebar_label: readonly_form
title: "readonly_form конфигурация"
description: "активирует режим только для чтения для lightbox"
--- 

# readonly_form

### Description

@short: Активирует режим только для чтения для lightbox

@signature: readonly_form: boolean

### Example

~~~jsx
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"month");
~~~ 

**Значение по умолчанию:** false

### Related samples
- [Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

:::note
 Свойство требует, чтобы был включён плагин [readonly](guides/extensions-list.md#readonly). 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Режим только для чтения](guides/readonly.md)