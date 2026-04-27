---
sidebar_label: "tooltip_hide_timeout"
title: "tooltip_hide_timeout config"
description: "툴팁이 사라지기 전에 얼마나 오래 표시될지(밀리초 단위) 설정합니다."
---

# tooltip_hide_timeout

### Description

@short: 툴팁이 사라지기 전에 얼마나 오래 표시될지(밀리초 단위) 설정합니다.

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

### Details

:::note
 이 옵션은 **tooltip** 확장의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 ["툴팁 (Tooltips)"](guides/tooltips.md) 문서에서 확인할 수 있습니다. 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- ["툴팁 (Tooltips)"](guides/tooltips.md)
