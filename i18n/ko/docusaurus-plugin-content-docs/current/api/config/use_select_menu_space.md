---
sidebar_label: "use_select_menu_space"
title: "use_select_menu_space config"
description: "이 옵션은 이벤트가 셀의 전체 너비를 차지하는지 여부를 정의합니다."
---

# use_select_menu_space

### Description

@short: 이 옵션은 이벤트가 셀의 전체 너비를 차지하는지 여부를 정의합니다.

@signature: use_select_menu_space: boolean

### Example

~~~jsx
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

기본적으로 이벤트는 셀의 전체 너비에 걸쳐 표시됩니다. 이 옵션을 *false*로 설정하면 이벤트가 셀 너비의 일부만 차지하여 왼쪽에 메뉴를 위한 공간이 남게 됩니다.

### Change log
- 이 속성은 버전 3.5부터 사용 가능합니다.
