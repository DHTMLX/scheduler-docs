---
sidebar_label: "tooltip_timeout"
title: "tooltip_timeout config"
description: "작업에 대한 tooltip이 나타나기까지 걸리는 시간(밀리초 단위)을 정의합니다"
---

# tooltip_timeout

### Description

@short: 작업에 대한 tooltip이 나타나기까지 걸리는 시간(밀리초 단위)을 정의합니다

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Default value:** 30

### Details

:::note
 이 설정은 **tooltip** 확장의 일부이므로, 반드시 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 자세한 내용은 ["툴팁 (Tooltips)"](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- ["툴팁 (Tooltips)"](guides/tooltips.md)
