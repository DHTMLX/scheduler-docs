---
sidebar_label: "readonly_form"
title: "readonly_form config"
description: "라이트박스에 읽기 전용 모드를 활성화합니다."
---

# readonly_form

### Description

@short: 라이트박스에 읽기 전용 모드를 활성화합니다.

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
 이 속성을 사용하려면 [readonly](guides/extensions-list.md#readonly) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- ["읽기 전용 모드"](guides/readonly.md)
