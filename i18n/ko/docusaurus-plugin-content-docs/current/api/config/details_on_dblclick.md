---
sidebar_label: "details_on_dblclick"
title: "details_on_dblclick config"
description: "이벤트를 더블 클릭하여 라이트박스를 열 수 있도록 설정합니다."
---

# details_on_dblclick

### Description

@short: 이벤트를 더블 클릭하여 라이트박스를 열 수 있도록 설정합니다.

@signature: details_on_dblclick: boolean

### Example

~~~jsx
scheduler.config.details_on_dblclick = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)

### Change log
- 버전 7.0부터 기본 설정이 `true`로 변경되었습니다.
