---
sidebar_label: "preserve_scroll"
title: "preserve_scroll config"
description: "동일한 뷰 내에서 날짜를 이동할 때 현재 스크롤 위치를 유지하지 않음"
---

# preserve_scroll

### Description

@short: 동일한 뷰 내에서 날짜를 이동할 때 현재 스크롤 위치를 유지하지 않음

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- 이 옵션은 버전 3.0부터 제공됩니다.
- 사용자가 네비게이션 패널을 사용하여 뷰 내에서 날짜를 변경할 때 적용됩니다. <br> -> ![navigation_panel](/img/navigation_panel.png).
