---
sidebar_label: "lightbox_recurring"
title: "lightbox_recurring config"
description: "반복 이벤트를 편집할 때 라이트박스의 동작 방식을 제어합니다."
---

# lightbox_recurring

### Description

@short: 반복 이벤트를 편집할 때 라이트박스의 동작 방식을 제어합니다.

@signature: lightbox_recurring: string

### Example

~~~jsx
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 'ask'

### Details

:::note
 이 속성은 [recurring](guides/extensions-list.md#recurring) 확장이 활성화되어 있어야 합니다. 
:::

이 옵션은 버전 3.5부터 제공됩니다.
