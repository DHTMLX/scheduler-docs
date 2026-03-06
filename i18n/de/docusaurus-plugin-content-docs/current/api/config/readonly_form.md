---
sidebar_label: "readonly_form"
title: "readonly_form config"
description: "aktiviert den Nur-Lese-Modus für die Lightbox"
---

# readonly_form

### Description

@short: Aktiviert den Nur-Lese-Modus für die Lightbox

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
 Diese Eigenschaft erfordert, dass das [readonly](guides/extensions-list.md#readonly) Plugin aktiviert ist. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Schreibgeschützter Modus](guides/readonly.md)
