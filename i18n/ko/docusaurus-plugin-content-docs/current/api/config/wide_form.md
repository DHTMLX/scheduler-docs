---
sidebar_label: "wide_form"
title: "wide_form config"
description: "표준 (wide) 라이트박스를 짧은 버전 대신 표시할지 여부를 제어합니다."
---

# wide_form

### Description

@short: 표준 (wide) 라이트박스를 짧은 버전 대신 표시할지 여부를 제어합니다.

@signature: wide_form: boolean

### Example

~~~jsx
scheduler.config.wide_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** true

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note

기본 스킨에서는 표준 (wide) 라이트박스가 기본으로 활성화되어 있으며, 짧은 버전으로 변경할 수 없습니다.
 
:::

<br>

- 표준 라이트박스

![wide_form_false](/img/wide_form_false.png)

- Wide 라이트박스

![wide_form_true](/img/wide_form_true.png)
