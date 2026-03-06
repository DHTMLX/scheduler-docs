---
sidebar_label: "icons_edit"
title: "icons_edit config"
description: "이벤트 박스 내의 사이드 편집 메뉴에 표시되는 아이콘 세트를 보유합니다."
---

# icons_edit

### Description

@short: 이벤트 박스 내의 사이드 편집 메뉴에 표시되는 아이콘 세트를 보유합니다.

@signature: icons_edit: any[]

### Example

~~~jsx
scheduler.config.icons_edit = ['icon_custom', 'icon_save', 'icon_cancel'];
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** ['icon_save', 'icon_cancel']

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_select](api/config/icons_select.md)

### Related Guides
- ["'Select' 및 'Edit' 바 커스터마이징"](guides/customizing-edit-select-bars.md)
