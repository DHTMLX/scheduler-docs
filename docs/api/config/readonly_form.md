---
sidebar_label: readonly_form
title: "readonly_form config"
description: "activates the read-only mode for the lightbox"
---

# readonly_form

### Description

@short: Activates the read-only mode for the lightbox

@signature: readonly_form: boolean

### Example

~~~jsx
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"month");
~~~

**Default value:** false

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

:::note
 The property requires the [readonly](guides/extensions-list.md#readonly) plugin to be enabled. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Read-only Mode](guides/readonly.md)
