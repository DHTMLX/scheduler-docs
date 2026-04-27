---
sidebar_label: "positive_closing"
title: "positive_closing config"
description: "사용자가 이벤트 박스 내에서 이벤트 텍스트를 직접 편집할 때 '저장' 동작을 제어합니다."
---

# positive_closing

### Description

@short: 사용자가 이벤트 박스 내에서 이벤트 텍스트를 직접 편집할 때 '저장' 동작을 제어합니다.

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

선택 바의 편집 버튼을 클릭하면 이벤트 텍스트를 편집할 수 있는 폼이 열립니다. 일반적으로 폼 외부를 클릭하면 폼이 닫히고 변경 사항이 취소됩니다. 이 옵션을 *true*로 설정하면 폼 외부를 클릭해도 변경 사항이 취소되지 않고 저장됩니다.

![positiveClosing_property](/img/positiveClosing_property.png)
