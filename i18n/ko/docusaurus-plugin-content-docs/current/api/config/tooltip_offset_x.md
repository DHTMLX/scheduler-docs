---
sidebar_label: "tooltip_offset_x"
title: "tooltip_offset_x config"
description: "툴팁의 위치를 수평으로 조정하며, 양수 값일 경우 오른쪽으로 이동합니다."
---

# tooltip_offset_x

### Description

@short: 툴팁의 위치를 수평으로 조정하며, 양수 값일 경우 오른쪽으로 이동합니다.

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Default value:** 10

### Details

:::note
 이 옵션은 **tooltip** 확장 기능의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 ["툴팁 (Tooltips)"](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- ["툴팁 (Tooltips)"](guides/tooltips.md)
