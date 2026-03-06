---
sidebar_label: "details_on_create"
title: "details_on_create config"
description: "드래그하거나 더블 클릭하여 새 이벤트를 생성할 때 확장된 폼을 사용할 수 있도록 합니다."
---

# details_on_create

### Description

@short: 드래그하거나 더블 클릭하여 새 이벤트를 생성할 때 확장된 폼을 사용할 수 있도록 합니다.

@signature: details_on_create: boolean

### Example

~~~jsx
scheduler.config.details_on_create=true;
...
scheduler.init('scheduler_here', new Date(2013,0,10), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Change log
- 버전 7.0부터 기본값이 `true`로 업데이트되었습니다.
