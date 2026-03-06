---
sidebar_label: "timeline_swap_resize"
title: "timeline_swap_resize config"
description: "이벤트의 종료일이 시작일보다 이전으로 이동할 경우, 리사이징 중에 종료일과 시작일이 서로 교환될 수 있도록 허용합니다."
---

# timeline_swap_resize
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 이벤트의 종료일이 시작일보다 이전으로 이동할 경우, 리사이징 중에 종료일과 시작일이 서로 교환될 수 있도록 허용합니다.

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Default value:** true

### Details

:::note
 이 속성을 사용하려면 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

*false*로 설정하면, 드래그 앤 드롭을 사용하여 이벤트를 리사이징할 때 종료일이 시작일을 넘어서거나 시작일이 종료일을 넘어서지 않도록 제한됩니다.

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#timeline)

### Change log
- 버전 4.4에서 추가됨
