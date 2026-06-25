---
sidebar_label: "readonly_form"
title: "readonly_form config"
description: "为 lightbox 启用只读模式"
---

# readonly_form

### Description

@short: 为 lightbox 启用只读模式

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
 此属性需要启用 [readonly](guides/extensions-list.md#readonly) 插件。 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [읽기 전용 모드](guides/readonly.md)
