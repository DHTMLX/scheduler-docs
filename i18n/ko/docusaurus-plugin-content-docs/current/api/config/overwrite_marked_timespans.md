---
sidebar_label: "overwrite_marked_timespans"
title: "overwrite_marked_timespans config"
description: "마크된 타임스팬의 차단 우선순위 제어"
---

# overwrite_marked_timespans

### Description

@short: 마크된 타임스팬의 차단 우선순위 제어

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Default value:** true

### Details

마크된 타임스팬은 설정에 따라 서로 다른 우선순위 레벨을 가집니다.
여러 개의 마크된 타임스팬이 우선순위가 다르게 겹칠 경우,
기본적으로 가장 높은 우선순위를 가진 마커만 표시됩니다.

이 옵션을 끄면 설정된 모든 마커를 볼 수 있습니다:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md#blocking-priority)

### Change log
- added in v6.0
