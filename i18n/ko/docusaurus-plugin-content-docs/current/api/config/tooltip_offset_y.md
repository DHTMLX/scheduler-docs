---
sidebar_label: "tooltip_offset_y"
title: "tooltip_offset_y config"
description: "값이 양수일 때 top 오프셋을 설정하여 tooltip의 수직 위치를 조정합니다."
---

# tooltip_offset_y

### Description

@short: 값이 양수일 때 top 오프셋을 설정하여 tooltip의 수직 위치를 조정합니다.

@signature: tooltip_offset_y: number

### Example

~~~jsx
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 20

### Details

:::note
 이 옵션은 **tooltip** 확장의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 ["툴팁 (Tooltips)"](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- ["툴팁 (Tooltips)"](guides/tooltips.md)
