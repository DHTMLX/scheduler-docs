---
sidebar_label: "fix_tab_position"
title: "fix_tab_position config"
description: "뷰의 탭을 왼쪽에서 오른쪽으로 이동합니다."
---

# fix_tab_position

### Description

@short: 뷰의 탭을 왼쪽에서 오른쪽으로 이동합니다.

@signature: fix_tab_position: boolean

### Example

~~~jsx
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

이 옵션은 버전 3.5부터 제공됩니다.

기본적으로 ['dhx_terrace' 스킨](guides/skins.md#terrace-skin)이 적용된 scheduler는 뷰 탭을 왼쪽에 표시합니다. 탭을 오른쪽으로 이동하려면 이 옵션을 *false*로 설정하면 됩니다.

### Related Guides
- ["스케줄러 마크업"](guides/scheduler-markup.md#tabs-positioning)
