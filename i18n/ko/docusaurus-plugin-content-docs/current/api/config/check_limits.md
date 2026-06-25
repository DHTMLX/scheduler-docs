---
sidebar_label: "check_limits"
title: "check_limits config"
description: "제한 검사 기능을 켜거나 끕니다."
---

# check_limits

### Description

@short: 제한 검사 기능을 켜거나 끕니다.

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2027,7,6),"week");
~~~

**Default value:** true

### Details

:::note
 이 속성은 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

이 옵션은 버전 3.5부터 사용 가능합니다.

제한이 설정되어 있지 않고 단순히 하이라이트나 현재 시간 표시만 필요한 경우, 이 설정을 끄면 성능 향상에 도움이 될 수 있습니다. 그러나 제한이 정의되어 있다면, 이 기능을 비활성화하면 모든 '차단' 기능도 함께 꺼집니다.

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
